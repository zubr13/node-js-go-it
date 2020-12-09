const sum = require('./sum');

describe("Should work correct with sum", () => {
    // beforeAll(() => {

    // });

    // afterAll(() => {

    // });

    // beforeEach(() => {

    // });

    // beforeAfter(() => {

    // });
    it("Should sum 2 + 2", () => {
        expect(sum(2, 2)).toBe(4);
    });

    it("Should sum 1 + 5", () => {
        expect(sum(1, 5)).toBeGreaterThan(0);
    });

    it("Should throw error for invalid params", () => {
        expect(() => sum("s", "d")).toThrow();
    });
});
