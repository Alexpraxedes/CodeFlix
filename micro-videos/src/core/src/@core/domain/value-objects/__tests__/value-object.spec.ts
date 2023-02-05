import { ValueObject } from "../value-objects";

class StubValueObject extends ValueObject {

}

describe("ValueObject Unit Tests", () => {
    it("should set value", () => {
        let vo = new StubValueObject("String value");
        expect(vo.value).toBe("String value");

        vo = new StubValueObject({ prop1: "Value1" });
        expect(vo.value).toStrictEqual({ prop1: "Value1" });
    });


    it("should return value as string", () => {
        const date = new Date();
        let data = [
            { received: "", expected: "" },
            { received: "Fake value", expected: "Fake value" },
            { received: 0, expected: "0" },
            { received: 1, expected: "1" },
            { received: 5, expected: "5" },
            { received: true, expected: "true" },
            { received: false, expected: "false" },
            { received: date, expected: date.toString() },
            { received: { prop1: "Value1" }, expected: JSON.stringify({ "prop1": "Value1" }) },
        ]

        data.forEach((value) => {
            const vo = new StubValueObject(value.received);
            expect(vo + "").toBe(value.expected);
        });
    });


    it("should be a immutable object", () => {
        const obj = {
            prop1: "Value1",
            deep: {
                prop2: "Value2",
                prop3: new Date()
            },
        };

        const vo = new StubValueObject(obj);
        expect(() => {
            (vo as any).value.prop1 = "New value";
        }).toThrow(
            "Cannot assign to read only property 'prop1' of object '#<Object>'"
        );

        expect(() => {
            (vo as any).value.deep.prop2 = "New value";
        }).toThrow(
            "Cannot assign to read only property 'prop2' of object '#<Object>'"
        );

        expect(vo.value.deep.prop3).toBeInstanceOf(Date);
    });
});