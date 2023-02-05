import { CategoryInMemoryRepository } from "../../../infra/repository/category-in-memory.repository";
import { CreateCategoryUseCase } from "../create-category.use-case";

describe('CreateCategoryUseCase Unit Tests', () => {
    let createCategoryUseCase: CreateCategoryUseCase.UseCase;
    let categoryRepository: CategoryInMemoryRepository;
    beforeEach(() => {
        categoryRepository = new CategoryInMemoryRepository();
        createCategoryUseCase = new CreateCategoryUseCase.UseCase(categoryRepository);
    });

    it('should create a category', async () => {
        const spyInsert = jest.spyOn(categoryRepository, 'insert');
        let category = await createCategoryUseCase.execute({ name: 'Category Name' });
        expect(spyInsert).toHaveBeenCalledTimes(1);
        expect(category).toStrictEqual({
            id: categoryRepository.items[0].id,
            name: 'Category Name',
            description: null,
            is_active: true,
            created_at: categoryRepository.items[0].created_at,
        });

        category = await createCategoryUseCase.execute({ name: 'Category Name', description: 'Category Description' });
        expect(spyInsert).toHaveBeenCalledTimes(2);
        expect(category).toStrictEqual({
            id: categoryRepository.items[1].id,
            name: 'Category Name',
            description: 'Category Description',
            is_active: true,
            created_at: categoryRepository.items[1].created_at,
        });

        category = await createCategoryUseCase.execute({ name: 'Category Name', description: 'Category Description', is_active: false });
        expect(spyInsert).toHaveBeenCalledTimes(3);
        expect(category).toStrictEqual({
            id: categoryRepository.items[2].id,
            name: 'Category Name',
            description: 'Category Description',
            is_active: false,
            created_at: categoryRepository.items[2].created_at,
        });
    });
});