import { Category } from "#category/domain";
import {
    SearchableRepositoryInterface,
    SearchParams as DefaultSearchParams,
    SearchResult as DefaultSearchResult
} from "#core/domain/repository/repository-contracts";

export namespace CategoryRepository {
    export type Filter = string;

    export class SearchParams extends DefaultSearchParams<Filter>{ }

    export class SearchResult extends DefaultSearchResult<
        Category,
        Filter
    >{ }

    export interface Repository extends SearchableRepositoryInterface<
        Category,
        Filter,
        SearchParams,
        SearchResult
    > { }
}