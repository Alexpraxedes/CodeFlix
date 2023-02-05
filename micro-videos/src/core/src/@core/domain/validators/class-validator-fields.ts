import { validateSync } from "class-validator";
import { ValidatorFieldsInterface, FieldsErrors } from "./validator-fields-interface";

export abstract class ClassValidatorFields<PropsValidated> implements ValidatorFieldsInterface<PropsValidated> {
    errors: FieldsErrors = null;
    validatedData: PropsValidated = null;
    validate(data: any): boolean {
        const errors = validateSync(data);
        if (errors.length) {
            this.errors = {};
            errors.forEach(error => {
                const { property, constraints } = error;
                this.errors[property] = Object.values(constraints);
            });
        }else{
            this.validatedData = data;
        }
        return !this.errors;
    }
}