import { ClassValidatorFields } from "../validators/class-validator-fields";
import { FieldsErrors } from "../validators/validator-fields-interface";
import { objectContaining } from "expect";
import { EntityValidationError } from "../errors/validation-error";

type Expected = {
    validator: ClassValidatorFields<any>,
    data: any,
} | (() => any);

expect.extend({
    containsErrorMessages(expect: Expected, received: FieldsErrors) {
        if (typeof expect === "function") {
            try {
                expect();
                return isValid();
            } catch (e) {
                const error = e as EntityValidationError;

                return assertContainsErrorsMessages(error.error, received);
            }
        } else {
            const validated = expect.validator.validate(expect.data);

            if (validated) {
                return isValid();
            }

            return assertContainsErrorsMessages(expect.validator.errors, received);
        }
    }
})

function isValid() {
    return {
        pass: false,
        message: () => "The data is valid"
    }
}

function assertContainsErrorsMessages(expected: FieldsErrors, received: FieldsErrors) {
    const isMatch = objectContaining(received).asymmetricMatch(expected);

    return isMatch ? {
        pass: true,
        message: () => "The data is invalid"
    } : {
        pass: false,
        message: () =>
            `The validation errors not contains ${JSON.stringify(received)}.Current: ${JSON.stringify(expected)}`,
    }
}