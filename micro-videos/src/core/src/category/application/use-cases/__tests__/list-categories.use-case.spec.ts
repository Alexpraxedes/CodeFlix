import { CategoryInMemoryRepository } from "../../../infra/repository/category-in-memory.repository";
import { CategoryRepository } from "../../../domain/repository/category.repository";
import { ListCategoriesUseCase } from "../list-categories.use-case";
import { Category } from "../../../domain/entities/category";

describe('ListCategoriesUseCase Unit Tests', () => {
    let listCategoriesUseCase: ListCategoriesUseCase.UseCase;
    let categoryRepository: CategoryInMemoryRepository;
    beforeEach(() => {
        categoryRepository = new CategoryInMemoryRepository();
        listCategoriesUseCase = new ListCategoriesUseCase.UseCase(categoryRepository);
    });

    test("toOutput method", () => {
        let result = new CategoryRepository.SearchResult({
            items: [],
            total: 1,
            current_page: 1,
            per_page: 2,
            sort: null,
            sort_dir: null,
            filter: null,
        });
        let output = listCategoriesUseCase['toOutput'](result);
        expect(output).toStrictEqual({
            items: [],
            total: 1,
            current_page: 1,
            per_page: 2,
            last_page: 1,
        });

        const category = new Category({ name: 'Category 1', description: 'Category 1 description' });
        result = new CategoryRepository.SearchResult({
            items: [category],
            total: 1,
            current_page: 1,
            per_page: 2,
            sort: null,
            sort_dir: null,
            filter: null,
        });
        output = listCategoriesUseCase['toOutput'](result);
        expect(output).toStrictEqual({
            items: [category.toJSON()],
            total: 1,
            current_page: 1,
            per_page: 2,
            last_page: 1,
        });
    })


    it("should returns output using empty input with categories ordered by created_at", async () => {
        const items = [
            new Category({ name: 'Category 1', description: 'Category 1 description' }),
            new Category({ name: 'Category 2', description: 'Category 2 description', created_at: new Date(new Date().getTime() + 100) }),
        ];
        categoryRepository.items = items;
        const output = await listCategoriesUseCase.execute({});
        expect(output).toStrictEqual({
            items: [...items].reverse().map(item => item.toJSON()),
            total: 2,
            current_page: 1,
            per_page: 10,
            last_page: 1,
        });

    });


    it("should returns output using pagination, sort and filter", async () => {
        const data = [
            new Category({ name: 'Category 2', description: 'Category 2 description' }),
            new Category({ name: 'Category 5', description: 'Category 5 description' }),
            new Category({ name: 'Movie 1', description: 'Movie 1 description' }),
            new Category({ name: 'Category 3', description: 'Category 3 description' }),
            new Category({ name: 'Category 1', description: 'Category 1 description' }),
            new Category({ name: 'Movie 2', description: 'Movie 2 description' }),
            new Category({ name: 'Category 4', description: 'Category 4 description' }),
        ];
        categoryRepository.items = data;
        let output = await listCategoriesUseCase.execute({
            page: 1,
            per_page: 2,
            sort: 'name',
            filter: 'Category',
        });
        expect(output).toStrictEqual({
            items: [data[4].toJSON(), data[0].toJSON()],
            total: 5,
            current_page: 1,
            per_page: 2,
            last_page: 3,
        });

        output = await listCategoriesUseCase.execute({
            page: 3,
            per_page: 2,
            sort: 'name',
            filter: 'Category',
        });
        expect(output).toStrictEqual({
            items: [data[1].toJSON()],
            total: 5,
            current_page: 3,
            per_page: 2,
            last_page: 3,
        });

        output = await listCategoriesUseCase.execute({
            page: 1,
            per_page: 2,
            sort: 'name',
            filter: 'Movie',
        });
        expect(output).toStrictEqual({
            items: [data[2].toJSON(), data[5].toJSON()],
            total: 2,
            current_page: 1,
            per_page: 2,
            last_page: 1,
        });

        output = await listCategoriesUseCase.execute({
            page: 1,
            per_page: 3,
            sort: 'name',
            sort_dir: 'desc',
            filter: 'Category',
        });
        expect(output).toStrictEqual({
            items: [data[1].toJSON(), data[6].toJSON(), data[3].toJSON()],
            total: 5,
            current_page: 1,
            per_page: 3,
            last_page: 2,
        });
    });
});