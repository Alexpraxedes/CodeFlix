import { FieldsErrors} from "#core/domain/validators/validator-fields-interface";

declare global {
    namespace jest {
        interface Matchers<R> {
            containsErrorMessages: (expceted: FieldsErrors) => R;
        }
    }
}

export {};