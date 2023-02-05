import { Category } from "../../../domain/entities/category";
import { CategoryOutputMapper } from "../category-output";

describe("CategoryOutputMapper Unit Tests", () => {
    it("should map category to category output", () => {
        const category = new Category({
            name: "Category name",
            description: "Category description",
            is_active: true,
            created_at: new Date(),
        });
        const spyToJSON = jest.spyOn(category, "toJSON");
        const categoryOutput = CategoryOutputMapper.toOutput(category);
        expect(spyToJSON).toHaveBeenCalled();
        expect(categoryOutput).toStrictEqual({
            id: category.id,
            name: "Category name",
            description: "Category description",
            is_active: true,
            created_at: category.created_at,
        });
    });
})