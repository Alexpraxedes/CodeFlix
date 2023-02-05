import { ValidationError } from "#core/domain/errors/validation-error";
import { ValidatorRules } from "../validator-rules";

type Values = {
    value: any;
    property: string;
    rule: keyof ValidatorRules;
    error: ValidationError;
    params?: any[]
}

function assertValues({ value, property, rule, params = [] }: Values) {
    const validator = ValidatorRules.values(value, property);
    const method = validator[rule] as (...args: any[]) => ValidatorRules;
    method.apply(validator, [...params]);
}

function assertIsInvalid(values: Values) {
    expect(() => {
        assertValues(values);
    }).toThrow(values.error);
}

function assertIsValid(values: Values) {
    expect(() => {
        assertValues(values);
    }).not.toThrow(values.error);
}

const errorRequired = "The property Field is required";
const errorString = "The property Field must be a string";
const errorMaxLength = "The property Field must have a maximum of 3 characters";
const errorBoolean = "The property Field must be a boolean";

describe("ValidatorRules Unit Tests", () => {
    test("values method", () => {
        const validator = ValidatorRules.values("New value", "Field");
        expect(validator).toBeInstanceOf(ValidatorRules);
        expect(validator['value']).toBe("New value");
        expect(validator['property']).toBe("Field");
    });


    test("required validation rule", () => {
        // should throw an error if the value is invalid
        let error = errorRequired;
        let data: Values[] = [
            { value: null, property: "Field", rule: "required", error: new ValidationError(error) },
            { value: undefined, property: "Field", rule: "required", error: new ValidationError(error) },
            { value: "", property: "Field", rule: "required", error: new ValidationError(error) },
        ]
        data.forEach(item => {
            assertIsInvalid({ value: item.value, property: item.property, rule: item.rule, error: item.error })
        });

        //should not throw an error if the value is valid
        data = [
            { value: "New value", property: "Field", rule: "required", error: new ValidationError(error) },
            { value: 11, property: "Field", rule: "required", error: new ValidationError(error) },
            { value: 0, property: "Field", rule: "required", error: new ValidationError(error) },
            { value: false, property: "Field", rule: "required", error: new ValidationError(error) },
        ]
        data.forEach(item => {
            assertIsValid({ value: item.value, property: item.property, rule: item.rule, error: item.error })
        });
    });


    test("string validation rule", () => {
        // should throw an error if the value is not string
        let error = errorString;
        let data: Values[] = [
            { value: 5, property: "Field", rule: "string", error: new ValidationError(error) },
            { value: {}, property: "Field", rule: "string", error: new ValidationError(error) },
            { value: false, property: "Field", rule: "string", error: new ValidationError(error) },
        ]
        data.forEach(item => {
            assertIsInvalid({ value: item.value, property: item.property, rule: item.rule, error: item.error })
        });

        //should not throw an error if the value is string
        data = [
            { value: null, property: "Field", rule: "string", error: new ValidationError(error) },
            { value: undefined, property: "Field", rule: "string", error: new ValidationError(error) },
            { value: "New value", property: "Field", rule: "string", error: new ValidationError(error) },
        ]
        data.forEach(item => {
            assertIsValid({ value: item.value, property: item.property, rule: item.rule, error: item.error })
        });
    });


    test("maxLength validation rule", () => {
        // should throw an error if the value is must be less than maxLength
        let error = errorMaxLength;
        let data: Values[] = [
            { value: "New value", property: "Field", rule: "maxLength", error: new ValidationError(error) },
        ]
        data.forEach(item => {
            assertIsInvalid({ value: item.value, property: item.property, rule: item.rule, error: item.error, params: [3] })
        });

        //should not throw an error if the value is not must be less than maxLength
        data = [
            { value: null, property: "Field", rule: "maxLength", error: new ValidationError(error) },
            { value: undefined, property: "Field", rule: "maxLength", error: new ValidationError(error) },
            { value: "New", property: "Field", rule: "maxLength", error: new ValidationError(error) },
        ]
        data.forEach(item => {
            assertIsValid({ value: item.value, property: item.property, rule: item.rule, error: item.error, params: [3] })
        });
    });


    test("boolean validation rule", () => {
        // should throw an error if the value is not boolean
        let error = errorBoolean;
        let data: Values[] = [
            { value: "New value", property: "Field", rule: "boolean", error: new ValidationError(error) },
            { value: 5, property: "Field", rule: "boolean", error: new ValidationError(error) },
            { value: "true", property: "Field", rule: "boolean", error: new ValidationError(error) },
            { value: "false", property: "Field", rule: "boolean", error: new ValidationError(error) },
        ]
        data.forEach(item => {
            assertIsInvalid({ value: item.value, property: item.property, rule: item.rule, error: item.error })
        });

        //should not throw an error if the value is boolean
        data = [
            { value: null, property: "Field", rule: "boolean", error: new ValidationError(error) },
            { value: undefined, property: "Field", rule: "boolean", error: new ValidationError(error) },
            { value: true, property: "Field", rule: "boolean", error: new ValidationError(error) },
            { value: false, property: "Field", rule: "boolean", error: new ValidationError(error) },
        ]
        data.forEach(item => {
            assertIsValid({ value: item.value, property: item.property, rule: item.rule, error: item.error })
        });
    });


    it("should throw a validation error when combine two or more validation rules", () => {
        let data: Values[] = [
            { value: null, property: "Field", rule: "required", error: new ValidationError(errorRequired) },
            { value: 5, property: "Field", rule: "required", error: new ValidationError(errorString) },
            { value: "New value", property: "Field", rule: "required", error: new ValidationError(errorMaxLength) },
        ]
        data.forEach(item => {
            expect(() => {
                ValidatorRules.values(item.value, item.property).required().string().maxLength(3);
            }).toThrow(item.error);
        });


        data = [
            { value: null, property: "Field", rule: "required", error: new ValidationError(errorRequired) },
            { value: 5, property: "Field", rule: "required", error: new ValidationError(errorBoolean) },
        ]
        data.forEach(item => {
            expect(() => {
                ValidatorRules.values(item.value, item.property).required().boolean();
            }).toThrow(item.error);
        });
    });


    it("should valid when combine two or more validation rules", () => {
        expect.assertions(0);
        ValidatorRules.values("New value", "Field").required().string();
        ValidatorRules.values("New value", "Field").required().string().maxLength(10);

        ValidatorRules.values(true, "Field").required().boolean();
        ValidatorRules.values(false, "Field").required().boolean();
    });
});