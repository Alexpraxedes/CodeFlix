import { Category } from "../../../domain/entities/category";
import { NotFoundError } from "#core/domain/errors/not-found.error";
import { CategoryInMemoryRepository } from "../../../infra/repository/category-in-memory.repository";
import { DeleteCategoryUseCase } from "../delete-category.use-case";

describe('DeleteCategoryUseCase Unit Tests', () => {
    let deleteCategoryUseCase: DeleteCategoryUseCase.UseCase;
    let categoryRepository: CategoryInMemoryRepository;
    beforeEach(() => {
        categoryRepository = new CategoryInMemoryRepository();
        deleteCategoryUseCase = new DeleteCategoryUseCase.UseCase(categoryRepository);
    });

    it('should throws error when entity not found', async () => {
        await expect(deleteCategoryUseCase.execute({ id: 'fake id' })).rejects.toThrowError(
            new NotFoundError("Item with id fake id not found")
        );
    });


    it('should returns when delete a category', async () => {
        const data = [
            new Category({ name: "Category 1" }),
            new Category({ name: "Category 2", description: "Category 2 description" }),
        ];
        categoryRepository.items = data;
        const spyDelete = jest.spyOn(categoryRepository, 'delete');
        expect(categoryRepository.items).toHaveLength(2);

        let output = await deleteCategoryUseCase.execute({ id: data[0].id });
        expect(spyDelete).toHaveBeenCalledTimes(1);
        expect(categoryRepository.items).toHaveLength(1);

        output = await deleteCategoryUseCase.execute({ id: data[0].id });
        expect(spyDelete).toHaveBeenCalledTimes(2);
        expect(categoryRepository.items).toHaveLength(0);
    });
});