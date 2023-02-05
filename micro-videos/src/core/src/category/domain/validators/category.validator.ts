
import { ClassValidatorFields } from "#core/domain/validators/class-validator-fields";
import { ValidatorFieldsInterface } from "#core/domain/validators/validator-fields-interface";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { CategoryProperties } from "../entities/category";

export class CategoryRoles {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsBoolean()
    @IsOptional()
    is_active: boolean;

    @IsDate()
    @IsOptional()
    created_at: Date;

    constructor({ name, description, is_active, created_at }: CategoryProperties) {
        Object.assign(this, { name, description, is_active, created_at });
    }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRoles> implements ValidatorFieldsInterface<CategoryRoles> {
    validate(data: CategoryProperties): boolean {
        return super.validate(new CategoryRoles(data));
    }
}

export class CategoryValidatorFactory {
    static create() {
        return new CategoryValidator();
    }
};