import InvalidUuidError from "./errors/invalid-uuid.error";
import UniqueEntityId from "./unique-entity-id.vo";

function spyOnValidateMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
}

describe("UniqueEntityId Unit Tests", () => {
  it("should throw error when uuid is invalid", () => {
    const validateSpy = spyOnValidateMethod();
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const validateSpy = spyOnValidateMethod();
    const uuid = "c56a4180-65aa-42ec-a945-5fd21dec0538";
    const vo = new UniqueEntityId(uuid);
    expect(vo.id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid not passed in constructor", () => {
    const validateSpy = spyOnValidateMethod();
    const vo = new UniqueEntityId();
    expect(vo.id).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
