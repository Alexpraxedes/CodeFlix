import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryOutput as Output, CategoryOutputMapper } from "../dto/category-output";
import { GetCategoryInput as Input } from "../dto/category-input.dto";
import { UseCase as DefaultUseCase } from "#core/application/use-case";

export namespace GetCategoryUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private categoryRepository: CategoryRepository.Repository) { }

        async execute(input: Input): Promise<Output> {
            const entity = await this.categoryRepository.findById(input.id);
            return CategoryOutputMapper.toOutput(entity);
        }
    };
};

