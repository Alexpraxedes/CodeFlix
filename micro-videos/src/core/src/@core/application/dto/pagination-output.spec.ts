import { PaginationOutputMapper } from "./pagination-output";
import { SearchResult } from "#core/domain/repository/repository-contracts";

describe("PaginationOutputMapper Unit Tests", () => {
    it("should map category to category output", () => {
        const result = new SearchResult({
            items: ["fake"] as any,
            total: 1,
            current_page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: null,
            filter: "fake",
        });
        const categoryOutput = PaginationOutputMapper.Output(result);
        expect(categoryOutput).toStrictEqual({
            total: 1,
            current_page: 1,
            per_page: 2,
            last_page: 1,
        });
    });
})