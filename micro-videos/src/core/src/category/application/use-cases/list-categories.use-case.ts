import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";
import { SearchInputDto as Input } from "#core/application/dto/search-input";
import { PaginationOutputDto, PaginationOutputMapper } from "#core/application/dto/pagination-output";
import { UseCase as DefaultUseCase } from "#core/application/use-case";

export namespace ListCategoriesUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private categoryRepository: CategoryRepository.Repository) { }

        async execute(input: Input): Promise<Output> {
            const params = new CategoryRepository.SearchParams(input);
            const searchResult = await this.categoryRepository.search(params);
            return this.toOutput(searchResult);
        }

        private toOutput(searchResult: CategoryRepository.SearchResult): Output {
            const items = searchResult.items.map(item => {
                return CategoryOutputMapper.toOutput(item);
            });
            return {
                items,
                ...PaginationOutputMapper.Output(searchResult),
            }
        }
    };

    export type Output = PaginationOutputDto<CategoryOutput>;
};