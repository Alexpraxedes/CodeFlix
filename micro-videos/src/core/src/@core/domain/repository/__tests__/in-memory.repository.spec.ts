import { UniqueEntityId } from "#core/domain/value-objects/unique-entity-id.vo";
import { InMemoryRepository } from "../in-memory.repository";
import { NotFoundError } from "#core/domain/errors/not-found.error";
import { Entity } from "#core/domain/entity/entity";

type StubEntityProps = {
    name: string;
    price: number;
};

class StubEntity extends Entity<StubEntityProps> {
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {
}

describe("InMemoryRepository Unit Tests", () => {
    let repository = new StubInMemoryRepository();
    beforeEach(() => repository = new StubInMemoryRepository());

    it("should inserts a new entity", async () => {
        const entity = new StubEntity({ name: "New value", price: 10 });
        await repository.insert(entity);
        expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });


    it("should throws error when entity not found", async () => {
        expect(repository.findById('fake id')).rejects.toThrow(
            new NotFoundError("Item with id fake id not found")
        );

        expect(repository.findById(new UniqueEntityId("c56a4180-65aa-42ec-a945-5fd21dec0538"))).rejects.toThrow(
            new NotFoundError("Item with id c56a4180-65aa-42ec-a945-5fd21dec0538 not found")
        );
    });


    it("should finds a entity by id", async () => {
        const entity = new StubEntity({ name: "New value", price: 10 });
        await repository.insert(entity);
        let entityFound = await repository.findById(entity.id);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

        entityFound = await repository.findById(entity.uniqueEntityId);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
    });


    it("should returns all entities", async () => {
        const entity = new StubEntity({ name: "New value", price: 10 });
        await repository.insert(entity);
        const entitiesFound = await repository.findAll();
        expect(entitiesFound).toStrictEqual([entity]);
    });


    it("should throws error on uptade when entity not found", async () => {
        const entity = new StubEntity({ name: "New value", price: 10 });

        expect(repository.update(entity)).rejects.toThrow(
            new NotFoundError(`Item with id ${entity.id} not found`)
        );
    });


    it("should uptade an entity", async () => {
        const entity = new StubEntity({ name: "New value", price: 10 });
        await repository.insert(entity);

        const entityUpdated = new StubEntity({ name: "Other value", price: 5 }, entity.uniqueEntityId);
        await repository.update(entityUpdated);
        expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });


    it("should throws error on delete when entity not found", async () => {
        expect(repository.delete('fake id')).rejects.toThrow(
            new NotFoundError("Item with id fake id not found")
        );

        expect(repository.delete(new UniqueEntityId("c56a4180-65aa-42ec-a945-5fd21dec0538"))).rejects.toThrow(
            new NotFoundError("Item with id c56a4180-65aa-42ec-a945-5fd21dec0538 not found")
        );
    });


    it("should deletes an entity", async () => {
        let entity = new StubEntity({ name: "New value", price: 10 });
        await repository.insert(entity);
        await repository.delete(entity.id);
        expect(repository.items).toHaveLength(0);

        await repository.insert(entity);
        await repository.delete(entity.uniqueEntityId);
        expect(repository.items).toHaveLength(0);
    });
});