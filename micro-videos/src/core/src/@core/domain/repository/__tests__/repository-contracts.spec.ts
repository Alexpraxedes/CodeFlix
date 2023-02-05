import { SearchParams, SearchResult } from "../repository-contracts";

describe("Search Unit Tests", () => {
    describe("SearchParams Unit Tests", () => {
        test("page prop", () => {
            let params = new SearchParams();
            expect(params.page).toBe(1);

            const data = [
                { page: null, expected: 1 },
                { page: undefined, expected: 1 },
                { page: "", expected: 1 },
                { page: "Fake", expected: 1 },
                { page: 0, expected: 1 },
                { page: -1, expected: 1 },
                { page: 5.5, expected: 1 },
                { page: true, expected: 1 },
                { page: false, expected: 1 },
                { page: {}, expected: 1 },
                { page: 1, expected: 1 },
                { page: 2, expected: 2 },
            ];

            data.forEach((item) => {
                expect(new SearchParams({ page: item.page as any }).page).toBe(item.expected);
            });
        })


        test("per_page prop", () => {
            let params = new SearchParams();
            expect(params.per_page).toBe(10);

            const data = [
                { per_page: null, expected: 10 },
                { per_page: undefined, expected: 10 },
                { per_page: "", expected: 10 },
                { per_page: "Fake", expected: 10 },
                { per_page: 0, expected: 10 },
                { per_page: -1, expected: 10 },
                { per_page: 5.5, expected: 10 },
                { per_page: true, expected: 10 },
                { per_page: false, expected: 10 },
                { per_page: {}, expected: 10 },
                { per_page: 1, expected: 1 },
                { per_page: 2, expected: 2 },
                { per_page: 15, expected: 15 },
            ];

            data.forEach((item) => {
                expect(new SearchParams({ per_page: item.per_page as any }).per_page).toBe(item.expected);
            });
        })


        test("sort prop", () => {
            let params = new SearchParams();
            expect(params.sort).toBeNull();

            const data = [
                { sort: null, expected: null },
                { sort: undefined, expected: null },
                { sort: "", expected: null },
                { sort: 0, expected: "0" },
                { sort: -1, expected: "-1" },
                { sort: 5.5, expected: "5.5" },
                { sort: true, expected: "true" },
                { sort: false, expected: "false" },
                { sort: {}, expected: "[object Object]" },
                { sort: "Field", expected: "Field" },
            ];

            data.forEach((item) => {
                expect(new SearchParams({ sort: item.sort as any }).sort).toBe(item.expected);
            });
        })


        test("sort prop", () => {
            let params = new SearchParams();
            expect(params.sort_dir).toBeNull();

            params = new SearchParams({ sort: null });
            expect(params.sort_dir).toBeNull();

            params = new SearchParams({ sort: undefined });
            expect(params.sort_dir).toBeNull();

            params = new SearchParams({ sort: "" });
            expect(params.sort_dir).toBeNull();

            const data = [
                { sort_dir: null, expected: "asc" },
                { sort_dir: undefined, expected: "asc" },
                { sort_dir: "", expected: "asc" },
                { sort_dir: 0, expected: "asc" },
                { sort_dir: -1, expected: "asc" },
                { sort_dir: "fake", expected: "asc" },

                { sort_dir: "asc", expected: "asc" },
                { sort_dir: "ASC", expected: "asc" },
                { sort_dir: "desc", expected: "desc" },
                { sort_dir: "DESC", expected: "desc" },
            ];

            data.forEach((item) => {
                expect(new SearchParams({ sort: "field", sort_dir: item.sort_dir as any }).sort_dir).toBe(item.expected);
            });
        })


        test("filter prop", () => {
            let params = new SearchParams();
            expect(params.filter).toBeNull();

            const data = [
                { filter: null, expected: null },
                { filter: undefined, expected: null },
                { filter: "", expected: null },
                { filter: 0, expected: "0" },
                { filter: -1, expected: "-1" },
                { filter: 5.5, expected: "5.5" },
                { filter: true, expected: "true" },
                { filter: false, expected: "false" },
                { filter: {}, expected: "[object Object]" },
                { filter: "Field", expected: "Field" },
            ];

            data.forEach((item) => {
                expect(new SearchParams({ filter: item.filter as any }).filter).toBe(item.expected);
            });
        })
    });


    describe("SearchResult Unit Tests", () => {
        test("constructor props", () => {
            let result = new SearchResult({
                items: ["item1", "item2"] as any,
                total: 4,
                current_page: 1,
                per_page: 2,
                sort: null,
                sort_dir: null,
                filter: null,
            });

            expect(result.toJSON()).toStrictEqual({
                items: ["item1", "item2"],
                total: 4,
                current_page: 1,
                per_page: 2,
                sort: null,
                sort_dir: null,
                filter: null,
                last_page: 2,
            });


            result = new SearchResult({
                items: ["item1", "item2"] as any,
                total: 4,
                current_page: 1,
                per_page: 2,
                sort: "name",
                sort_dir: "asc",
                filter: "test",
            });

            expect(result.toJSON()).toStrictEqual({
                items: ["item1", "item2"],
                total: 4,
                current_page: 1,
                per_page: 2,
                last_page: 2,
                sort: "name",
                sort_dir: "asc",
                filter: "test",
            });
        });


        it("should set last_page 1 when per_page field is greater than total field", () => {
            const result = new SearchResult({
                items: [] as any,
                total: 4,
                current_page: 1,
                per_page: 15,
                sort: null,
                sort_dir: null,
                filter: null,
            });

            expect(result.last_page).toBe(1);
        });


        test("last_page prop when total is not a multiple of per_page", () => {
            const result = new SearchResult({
                items: [] as any,
                total: 101,
                current_page: 1,
                per_page: 20,
                sort: null,
                sort_dir: null,
                filter: null,
            });

            expect(result.last_page).toBe(6);
        });
    });
});