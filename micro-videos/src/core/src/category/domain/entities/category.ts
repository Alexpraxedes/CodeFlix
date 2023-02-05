import { UniqueEntityId } from "#core/domain/value-objects/unique-entity-id.vo";
import { Entity } from "#core/domain/entity/entity";
import { CategoryValidatorFactory } from "../validators/category.validator";
import { EntityValidationError } from "#core/domain/errors/validation-error";

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export class Category extends Entity<CategoryProperties>{
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    Category.validade(props);
    super(props, id);
    this.props.description = this.props.description ?? null;
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  update(name: string, description: string) {
    Category.validade({ name, description });
    this.name = name;
    this.description = description;
  }

  static validade(props: CategoryProperties) {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid)
      throw new EntityValidationError(validator.errors);
  }

  activate() {
    this.is_active = true;
  }

  deactivate() {
    this.is_active = false;
  }

  get name(): string {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get description(): string {
    return this.props.description ?? null;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get is_active(): boolean {
    return this.props.is_active;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get created_at(): Date {
    return this.props.created_at;
  }
}
