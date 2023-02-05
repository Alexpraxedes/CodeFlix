import { Category } from "./category";
import { CategoryValidator } from "../validators/category.validator";

describe("Category Integration Tests", () => {
    let validator: CategoryValidator;
    describe("create method", () => {
        it("should a invalid category using name property", () => {
            let data = [
                { name: null, expcet: {error: ["name should not be empty", "name must be a string", "name must be shorter than or equal to 255 characters"] }},
                { name: "", expcet: {error: ["name should not be empty"]}},
                { name: 5 as any, expcet: {error: ["name must be a string", "name must be shorter than or equal to 255 characters"]}},
                { name: "t".repeat(256), expcet: {error: ["name must be shorter than or equal to 255 characters"]}},
            ]
    
            data.forEach( (item) => {
                expect(() => new Category(item)).containsErrorMessages({name: item.expcet.error});
            });
        });


        it("should a invalid category using description property", () => {
            expect(() => new Category({ name: "Movie", description: 5 as any })).containsErrorMessages({
                description: ["description must be a string"],
            });
        });


        it("should a invalid category using is_active property", () => {
            expect(() => new Category({ name: "Movie", is_active: 5 as any })).containsErrorMessages({
                is_active: ["is_active must be a boolean value"],
            });
        });


        it("should a valid category", () => {
            expect.assertions(0);
            new Category({ name: "Movie" });
            new Category({ name: "Movie", description: "Movie description" });
            new Category({ name: "Movie", description: null });
            new Category({ name: "Movie", description: "Movie description", is_active: false, });
            new Category({ name: "Movie", description: "Movie description", is_active: true, });
        });
    });

    describe("update method", () => {
        const category = new Category({ name: "Movie" });
        it("should a invalid category using name property", () => {
            let data = [
                { name: null, expcet: {error: ["name should not be empty", "name must be a string", "name must be shorter than or equal to 255 characters"] }},
                { name: "", expcet: {error: ["name should not be empty"]}},
                { name: 5 as any, expcet: {error: ["name must be a string", "name must be shorter than or equal to 255 characters"]}},
                { name: "t".repeat(256), expcet: {error: ["name must be shorter than or equal to 255 characters"]}},
            ]
    
            data.forEach( (item) => {
                expect(() => category.update(item.name, null)).containsErrorMessages({name: item.expcet.error});
            });
        });


        it("should a invalid category using description property", () => {
            const category = new Category({ name: "Movie" });
            expect(() => category.update("Movie", 5 as any)).containsErrorMessages({
                description: ["description must be a string"],
            });
        });


        it("should a valid category", () => {
            expect.assertions(0);
            const category = new Category({ name: "Movie" });
            category.update("Edit Movie", null);
            category.update("Movie", "Movie description");
        });
    });
});