import { CategoryRepository } from "../../domain/repository/category.repository";
import { GetCategoryInput as Input } from "../dto/category-input.dto";
import { UseCase as DefaultUseCase } from "#core/application/use-case";

export namespace DeleteCategoryUseCase {
    export class UseCase implements DefaultUseCase<Input, void> {
        constructor(private categoryRepository: CategoryRepository.Repository) { }

        async execute(input: Input): Promise<void> {
            const entity = await this.categoryRepository.delete(input.id);
        }
    };
};

