import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryOutput as Output, CategoryOutputMapper } from "../dto/category-output";
import { UpdateCategoryInput as Input } from "../dto/category-input.dto";
import { UseCase as DefaultUseCase } from "#core/application/use-case";

export namespace UpdateCategoryUseCase {
    export class UseCase implements DefaultUseCase<Input, Output>{
        constructor(private categoryRepository: CategoryRepository.Repository) { }

        async execute(input: Input): Promise<Output> {
            const entity = await this.categoryRepository.findById(input.id);
            entity.update(input.name, input.description);

            if (input.is_active === true)
                entity.activate();

            if (input.is_active === false)
                entity.deactivate();

            await this.categoryRepository.update(entity);
            return CategoryOutputMapper.toOutput(entity);
        }
    };
};