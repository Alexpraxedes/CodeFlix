import { CategoryRepository } from "../../domain/repository/category.repository";
import { Category } from "../../domain/entities/category";
import { CategoryOutput as Output, CategoryOutputMapper } from "../dto/category-output";
import { CreateCategoryInput as Input } from "../dto/category-input.dto";
import { UseCase as DefaultUseCase } from "#core/application/use-case";

export namespace CreateCategoryUseCase {
    export class UseCase implements DefaultUseCase<Input, Output>{
        constructor(private categoryRepository: CategoryRepository.Repository) { }

        async execute(input: Input): Promise<Output> {
            const entity = new Category(input);
            await this.categoryRepository.insert(entity);
            return CategoryOutputMapper.toOutput(entity);
        }
    };
};