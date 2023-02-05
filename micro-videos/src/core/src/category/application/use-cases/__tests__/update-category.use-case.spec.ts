import { CategoryInMemoryRepository } from "../../../infra/repository/category-in-memory.repository";
import { NotFoundError } from "../../../../@core/domain/errors/not-found.error";
import { UpdateCategoryUseCase } from "../update-category.use-case";
import { Category } from "../../../domain/entities/category";

describe('UpdateCategoryUseCase Unit Tests', () => {
    let updateCategoryUseCase: UpdateCategoryUseCase.UseCase;
    let categoryRepository: CategoryInMemoryRepository;
    beforeEach(() => {
        categoryRepository = new CategoryInMemoryRepository();
        updateCategoryUseCase = new UpdateCategoryUseCase.UseCase(categoryRepository);
    });

    it('should throws error when entity not found', async () => {
        expect(() => updateCategoryUseCase.execute(
            { id: 'fake id', name: "Category Fake" }
        )).rejects.toThrow(new NotFoundError("Item with id fake id not found"));
    });

    it('should update a category', async () => {
        const spyUpdate = jest.spyOn(categoryRepository, 'update');
        const category = new Category({ name: 'Category Name' });
        categoryRepository.items = [category];
        let output = await updateCategoryUseCase.execute({ id: category.id, name: 'Category Test' });
        expect(spyUpdate).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: category.id,
            name: 'Category Test',
            description: null,
            is_active: true,
            created_at: category.created_at,
        });

        output = await updateCategoryUseCase.execute({ id: category.id, name: 'Category Name', description: 'Category Description' });
        expect(output).toStrictEqual({
            id: category.id,
            name: 'Category Name',
            description: 'Category Description',
            is_active: true,
            created_at: category.created_at,
        });

        output = await updateCategoryUseCase.execute({ id: category.id, name: 'Other Category' });
        expect(output).toStrictEqual({
            id: category.id,
            name: 'Other Category',
            description: null,
            is_active: true,
            created_at: category.created_at,
        });

        output = await updateCategoryUseCase.execute({ id: category.id, name: 'Category Movie', description: 'Movie Description', is_active: false });
        expect(output).toStrictEqual({
            id: category.id,
            name: 'Category Movie',
            description: 'Movie Description',
            is_active: false,
            created_at: category.created_at,
        });

        output = await updateCategoryUseCase.execute({ id: category.id, name: 'Category Movies', description: 'Movie Description' });
        expect(output).toStrictEqual({
            id: category.id,
            name: 'Category Movies',
            description: 'Movie Description',
            is_active: false,
            created_at: category.created_at,
        });

        output = await updateCategoryUseCase.execute({ id: category.id, name: 'Category Movies', description: 'Other Description', is_active: true });
        expect(output).toStrictEqual({
            id: category.id,
            name: 'Category Movies',
            description: 'Other Description',
            is_active: true,
            created_at: category.created_at,
        });
    });
});