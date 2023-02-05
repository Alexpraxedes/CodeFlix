import { Entity } from "#core/domain/entity/entity";
import { InMemorySearchableRepository } from "../in-memory.repository";
import { SearchParams, SearchResult } from "../repository-contracts";

type StubEntityProps = {
    name: string;
    price: number;
}

class StubEntity extends Entity<StubEntityProps>{
}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity>{
    sortableFields = ["name"];
    protected async applyFilter(items: StubEntity[], filter: string | null): Promise<StubEntity[]> {
        if (!filter) {
            return items;
        }

        return items.filter((item) => {
            return (
                item.props.name.toLowerCase().includes(filter.toLowerCase()) ||
                item.props.price.toString() === filter
            );
        });
    }
}

describe("InMemorySearchableRepository Unit Tests", () => {
    let repository: StubInMemorySearchableRepository;
    beforeEach(() => (repository = new StubInMemorySearchableRepository()));

    describe("applyFilter method", () => {
        it("should no filter items when filter param is null", async () => {
            const items = [new StubEntity({ name: "Item 1", price: 10 })];
            const spyFilterMethod = jest.spyOn(items, "filter" as any);
            const filteredItems = await repository['applyFilter'](items, null);
            expect(filteredItems).toStrictEqual(items);
            expect(spyFilterMethod).not.toHaveBeenCalled();
        });


        it("should filter using a filter param", async () => {
            const items = [
                new StubEntity({ name: "test", price: 5 }),
                new StubEntity({ name: "TEST", price: 5 }),
                new StubEntity({ name: "fake", price: 0 })
            ];
            const spyFilterMethod = jest.spyOn(items, "filter" as any);
            let filteredItems = await repository['applyFilter'](items, "TEST");
            expect(filteredItems).toStrictEqual([items[0], items[1]]);
            expect(spyFilterMethod).toHaveBeenCalledTimes(1);

            filteredItems = await repository['applyFilter'](items, "5");
            expect(filteredItems).toStrictEqual([items[0], items[1]]);
            expect(spyFilterMethod).toHaveBeenCalledTimes(2);

            filteredItems = await repository['applyFilter'](items, "no-filter");
            expect(filteredItems).toHaveLength(0);
            expect(spyFilterMethod).toHaveBeenCalledTimes(3);
        });
    });


    describe("applySort method", () => {
        it("should no sort items", async () => {
            const items = [
                new StubEntity({ name: "b", price: 5 }),
                new StubEntity({ name: "a", price: 5 })
            ];
            let sortedItems = await repository['applySort'](items, null, null);
            expect(sortedItems).toStrictEqual(items);

            sortedItems = await repository['applySort'](items, "price", "asc");
            expect(sortedItems).toStrictEqual(items);
        });


        it("should no sort items", async () => {
            const items = [
                new StubEntity({ name: "b", price: 5 }),
                new StubEntity({ name: "a", price: 5 }),
                new StubEntity({ name: "c", price: 5 })
            ];
            let sortedItems = await repository['applySort'](items, "name", "asc");
            expect(sortedItems).toStrictEqual([items[1], items[0], items[2]]);

            sortedItems = await repository['applySort'](items, "name", "desc");
            expect(sortedItems).toStrictEqual([items[2], items[0], items[1]]);
        });
    });


    describe("applyPagination method", () => {
        it("should pagination items", async () => {
            const items = [
                new StubEntity({ name: "a", price: 5 }),
                new StubEntity({ name: "b", price: 5 }),
                new StubEntity({ name: "c", price: 5 }),
                new StubEntity({ name: "d", price: 5 }),
                new StubEntity({ name: "e", price: 5 })
            ];
            let paginatedItems = await repository['applyPagination'](items, 1, 2);
            expect(paginatedItems).toStrictEqual([items[0], items[1]]);

            paginatedItems = await repository['applyPagination'](items, 2, 2);
            expect(paginatedItems).toStrictEqual([items[2], items[3]]);

            paginatedItems = await repository['applyPagination'](items, 4, 2);
            expect(paginatedItems).toStrictEqual([]);
        });
    });


    describe("search method", () => {
        it("should apply only pagination when other params are null", async () => {
            const entity = new StubEntity({ name: "a", price: 5 });
            const items = Array(16).fill(entity);
            repository.items = items;

            const result = await repository.search(new SearchParams());
            expect(result).toStrictEqual(
                new SearchResult({
                    items: items.slice(0, 10),
                    total: items.length,
                    current_page: 1,
                    per_page: 10,
                    sort: null,
                    sort_dir: null,
                    filter: null,
                })
            );
        });



        it("should apply pagination and filter", async () => {
            const items = [
                new StubEntity({ name: "test", price: 5 }),
                new StubEntity({ name: "a", price: 5 }),
                new StubEntity({ name: "Test", price: 5 }),
                new StubEntity({ name: "TeSt", price: 5 }),
                new StubEntity({ name: "test", price: 5 })
            ];
            repository.items = items;

            let result = await repository.search(
                new SearchParams({
                    page: 1,
                    per_page: 2,
                    filter: "TEST",
                })
            );
            expect(result).toStrictEqual(
                new SearchResult({
                    items: [items[0], items[2]],
                    total: 4,
                    current_page: 1,
                    per_page: 2,
                    sort: null,
                    sort_dir: null,
                    filter: "TEST",
                })
            );

            result = await repository.search(
                new SearchParams({
                    page: 2,
                    per_page: 2,
                    filter: "TEST",
                })
            );
            expect(result).toStrictEqual(
                new SearchResult({
                    items: [items[3], items[4]],
                    total: 4,
                    current_page: 2,
                    per_page: 2,
                    sort: null,
                    sort_dir: null,
                    filter: "TEST",
                })
            );
        });



        it("should apply pagination and sort", async () => {
            const items = [
                new StubEntity({ name: "b", price: 5 }),
                new StubEntity({ name: "a", price: 5 }),
                new StubEntity({ name: "d", price: 5 }),
                new StubEntity({ name: "e", price: 5 }),
                new StubEntity({ name: "c", price: 5 })
            ];
            repository.items = items;

            const data = [
                {
                    params: new SearchParams({ page: 1, per_page: 2, sort: "name" }),
                    result: new SearchResult({ items: [items[1], items[0]], total: items.length, current_page: 1, per_page: 2, sort: "name", sort_dir: "asc", filter: null })
                },
                {
                    params: new SearchParams({ page: 2, per_page: 2, sort: "name" }),
                    result: new SearchResult({ items: [items[4], items[2]], total: items.length, current_page: 2, per_page: 2, sort: "name", sort_dir: "asc", filter: null })
                },
                {
                    params: new SearchParams({ page: 1, per_page: 2, sort: "name", sort_dir: "desc" }),
                    result: new SearchResult({ items: [items[3], items[2]], total: items.length, current_page: 1, per_page: 2, sort: "name", sort_dir: "desc", filter: null })
                },
                {
                    params: new SearchParams({ page: 2, per_page: 2, sort: "name", sort_dir: "desc" }),
                    result: new SearchResult({ items: [items[4], items[0]], total: items.length, current_page: 2, per_page: 2, sort: "name", sort_dir: "desc", filter: null })
                }
            ];

            for (const { params, result } of data) {
                const searchResult = await repository.search(params);
                expect(searchResult).toStrictEqual(result);
            }
        });



        it("should apply pagination, filter and sort", async () => {
            const items = [
                new StubEntity({ name: "test", price: 5 }),
                new StubEntity({ name: "a", price: 5 }),
                new StubEntity({ name: "TEST", price: 5 }),
                new StubEntity({ name: "e", price: 5 }),
                new StubEntity({ name: "TeSt", price: 5 })
            ];
            repository.items = items;

            const data = [
                {
                    params: new SearchParams({ page: 1, per_page: 2, sort: "name", filter: "TEST" }),
                    result: new SearchResult({ items: [items[2], items[4]], total: 3, current_page: 1, per_page: 2, sort: "name", sort_dir: "asc", filter: "TEST" })
                },
                {
                    params: new SearchParams({ page: 2, per_page: 2, sort: "name", filter: "TEST" }),
                    result: new SearchResult({ items: [items[0]], total: 3, current_page: 2, per_page: 2, sort: "name", sort_dir: "asc", filter: "TEST" })
                }
            ];

            for (const { params, result } of data) {
                const searchResult = await repository.search(params);
                expect(searchResult).toStrictEqual(result);
            }
        });
    });
});