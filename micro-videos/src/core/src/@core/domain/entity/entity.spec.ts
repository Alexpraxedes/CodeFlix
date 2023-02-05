import { UniqueEntityId } from "../value-objects/unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";
import { Entity } from "./entity";

class StubEntity extends Entity<{ prop1: string; prop2: number; }> {

}

describe('Entity Unit Tests', () => {
    it('should set props and id', () => {
        const data = { prop1: 'New value', prop2: 11 };
        const entity = new StubEntity(data);
        expect(entity.props).toEqual(data);
        expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
        expect(uuidValidate(entity.id)).toBeTruthy();
    });


    it('should accept a valid uuid', () => {
        const data = { prop1: 'New value', prop2: 11 };
        const uniqueEntityId = new UniqueEntityId();
        const entity = new StubEntity(data, uniqueEntityId);
        expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
        expect(entity.id).toBe(uniqueEntityId.value);
    });


    it('should convert a entity to a JavaScript object', () => {
        const data = { prop1: 'New value', prop2: 11 };
        const uniqueEntityId = new UniqueEntityId();
        const entity = new StubEntity(data, uniqueEntityId);
        expect(entity.toJSON()).toStrictEqual({
            id: entity.id,
            ...data,
        });
    });
});