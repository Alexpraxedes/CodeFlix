import { ClassValidatorFields } from "../class-validator-fields";
import * as libClassValidator from "class-validator";

class StubClassValidatorFields extends ClassValidatorFields<{ field: string }>{

}

describe("ClassValidatorFields Unit Tests", () => {
    it("shold initialize erros and validateData variables with null", () => {
        const validator = new StubClassValidatorFields();
        expect(validator.errors).toBeNull();
        expect(validator.validatedData).toBeNull();
    });


    it("shold validate with errors", () => {
        const spyValidateSync = jest.spyOn(libClassValidator, "validateSync").mockReturnValue([
            { property: "field", constraints: { isRequired: "field is required" } },
        ]);
        const validator = new StubClassValidatorFields();
        expect(validator.validate(null)).toBeFalsy();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(validator.validatedData).toBeNull();
        expect(validator.errors).toStrictEqual({ field: ["field is required"] });
    });


    it("shold validate without errors", () => {
        const spyValidateSync = jest.spyOn(libClassValidator, "validateSync").mockReturnValue([
            { property: "field", constraints: { isRequired: "field is required" } },
        ]);
        spyValidateSync.mockReturnValue([]);
        const validator = new StubClassValidatorFields();
        expect(validator.validate({ field: "New value" })).toBeTruthy();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(validator.validatedData).toStrictEqual({ field: "New value" });
        expect(validator.errors).toBeNull();
    });
});