import { deepFreeze } from "./object";

describe("Object Unit Tests", () => {
    it("should not freeze a scalar value", () => {
        const str = deepFreeze("a");
        expect(typeof str).toBe("string");

        let bool = deepFreeze(true);
        expect(typeof bool).toBe("boolean");
        bool = deepFreeze(false);
        expect(typeof bool).toBe("boolean");

        const num = deepFreeze(1);
        expect(typeof num).toBe("number");

        const date = deepFreeze(new Date());
        expect(date instanceof Date).toBe(true);

        const obj = deepFreeze({});
        expect(typeof obj).toBe("object");
    });

    it("should be a immutable object", () => {
        const obj = deepFreeze({ 
            prop1: "Value1",
            deep: { prop2: "Value2", prop3: new Date(), prop4: { value: "object" } },
        });

        expect( () => {
            (obj as any).prop1 = "New value";
        }).toThrow(
            "Cannot assign to read only property 'prop1' of object '#<Object>'"
        );

        expect( () => {
            (obj as any).deep.prop2 = "New value";
        }).toThrow(
            "Cannot assign to read only property 'prop2' of object '#<Object>'"
        );

        expect(obj.deep.prop3).toBeInstanceOf(Date);

        expect(obj.deep.prop4).toBeInstanceOf(Object);
    });
});