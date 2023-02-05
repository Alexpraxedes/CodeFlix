import { Category } from "#category/domain/entities/category";
import { CategoryInMemoryRepository } from "./category-in-memory.repository";

describe('CategoryInMemoryRepository Unit Tests', () => {
    let inMemoryRepository: CategoryInMemoryRepository;

    beforeEach(() => (
        inMemoryRepository = new CategoryInMemoryRepository()
    ));

    it('should no filter', async () => {
        const items = [new Category({ name: 'Category 1' })];
        const filterSpy = jest.spyOn(items, 'filter' as any);
        const filteredItems = await inMemoryRepository["applyFilter"](items, null);
        expect(filterSpy).not.toHaveBeenCalled();
        expect(filteredItems).toStrictEqual(items);
    });


    it('should filter by name', async () => {
        const items = [
            new Category({ name: 'Category 1' }),
            new Category({ name: 'Category 2' }),
            new Category({ name: 'Category 3' }),
        ];
        const filterSpy = jest.spyOn(items, 'filter' as any);
        let filteredItems = await inMemoryRepository["applyFilter"](items, "Category 2");

        expect(filterSpy).toHaveBeenCalled();
        expect(filteredItems).toStrictEqual([items[1]]);

        filteredItems = await inMemoryRepository["applyFilter"](items, "Category");
        expect(filterSpy).toHaveBeenCalledTimes(2);
        expect(filteredItems).toStrictEqual([items[0], items[1], items[2]]);
    });


    it('should sort when no sort params', async () => {
        const items = [
            new Category({ name: 'Category 1', created_at: new Date('2021-01-03') }),
            new Category({ name: 'Category 2', created_at: new Date('2021-01-01') }),
            new Category({ name: 'Category 3', created_at: new Date('2021-01-02') }),
        ];
        const sortSpy = jest.spyOn(items, 'sort' as any);
        const sortedItems = await inMemoryRepository["applySort"](items, null, null);
        expect(sortSpy).not.toHaveBeenCalled();
        expect(sortedItems).toStrictEqual([items[0], items[2], items[1]]);
    });


    it('should sort by name', async () => {
        const items = [
            new Category({ name: 'Category 3' }),
            new Category({ name: 'Category 1' }),
            new Category({ name: 'Category 2' }),
        ];
        const sortSpy = jest.spyOn(items, 'sort' as any);
        let sortedItems = await inMemoryRepository["applySort"](items, 'name', 'asc');
        expect(sortedItems).toStrictEqual([items[1], items[2], items[0]]);

        sortedItems = await inMemoryRepository["applySort"](items, 'name', 'desc');
        expect(sortedItems).toStrictEqual([items[0], items[2], items[1]]);
    });
});