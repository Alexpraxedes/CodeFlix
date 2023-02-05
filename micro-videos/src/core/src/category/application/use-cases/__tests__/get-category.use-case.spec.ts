import { Category } from "../../../domain/entities/category";
import { NotFoundError } from "../../../../@core/domain/errors/not-found.error";
import { CategoryInMemoryRepository } from "../../../infra/repository/category-in-memory.repository";
import { GetCategoryUseCase } from "../get-category.use-case";

describe('GetCategoryUseCase Unit Tests', () => {
    let getCategoryUseCase: GetCategoryUseCase.UseCase;
    let categoryRepository: CategoryInMemoryRepository;
    beforeEach(() => {
        categoryRepository = new CategoryInMemoryRepository();
        getCategoryUseCase = new GetCategoryUseCase.UseCase(categoryRepository);
    });

    it('should throws error when entity not found', async () => {
        await expect(getCategoryUseCase.execute({ id: 'fake id' })).rejects.toThrowError(
            new NotFoundError("Item with id fake id not found")
        );
    });


    it('should returns when get a category', async () => {
        const data = [
            new Category({ name: "Category 1" }),
            new Category({ name: "Category 2", description: "Category 2 description" }),
        ];
        categoryRepository.items = data;
        const spyFindById = jest.spyOn(categoryRepository, 'findById');

        let output = await getCategoryUseCase.execute({ id: data[0].id });
        expect(spyFindById).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: data[0].id,
            name: "Category 1",
            description: null,
            is_active: true,
            created_at: data[0].created_at,
        });

        output = await getCategoryUseCase.execute({ id: data[1].id });
        expect(spyFindById).toHaveBeenCalledTimes(2);
        expect(output).toStrictEqual({
            id: data[1].id,
            name: "Category 2",
            description: "Category 2 description",
            is_active: true,
            created_at: data[1].created_at,
        });
    });
});