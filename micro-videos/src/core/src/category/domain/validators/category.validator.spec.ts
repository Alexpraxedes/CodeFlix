import { CategoryValidatorFactory, CategoryRoles, CategoryValidator } from "./category.validator";

describe("CategoryValidator Tests", () => {
    let validator: CategoryValidator;
    beforeEach( () => (validator = CategoryValidatorFactory.create()));

    test("invalidation cases for name field", () => {
        let data = [
            { name: null, expcet: {error: ["name should not be empty", "name must be a string", "name must be shorter than or equal to 255 characters"] }},
            { name: 5 as any, expcet: {error: ["name must be a string", "name must be shorter than or equal to 255 characters"]}},
            { name: "t".repeat(256), expcet: {error: ["name must be shorter than or equal to 255 characters"]}},
            { name: "", expcet: {error: ["name should not be empty"]}},
        ]

        data.forEach( (item) => {
            expect({validator, data: item}).containsErrorMessages({name: item.expcet.error});
        });
    });


    test("invalidation cases for description field", () => {
        expect({validator, data: { description: 5 }}).containsErrorMessages({description: ["description must be a string"]});
    });


    test("invalidation cases for is_active field", () => {
        let data = [
            { is_active: 5, expcet: {error: ["is_active must be a boolean value"] }},
            { is_active: 0, expcet: {error: ["is_active must be a boolean value"]}},
            { is_active: 1, expcet: {error: ["is_active must be a boolean value"]}},
        ]

        data.forEach( (item) => {
            expect({validator, data: item}).containsErrorMessages({is_active: item.expcet.error});
        });
    });


    test("Valid cases for fields", () => {
        let data = [
            { name: "New value"},
            { name: "New value", description: undefined },
            { name: "New value", description: "Description value" },
            { name: "New value", is_active: true },
            { name: "New value", is_active: false },
            { name: "New value", created_at: new Date() },
            { name: "New value", description: "Description value", is_active: true, created_at: new Date() },
        ]

        data.forEach( (item) => {
            const isValid = validator.validate(item);
            expect(isValid).toBeTruthy();
            expect(validator.validatedData).toStrictEqual( new CategoryRoles(item));
        });
    });
});