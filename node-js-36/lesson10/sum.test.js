const sum = require('./sum');

describe('Should test sum function', () => {
    beforeAll(() => {
        // mock db
    });
    afterAll(() => {
        // clear initialize
    });

    beforeEach(() => {
        // init data before each test
    });

    afterEach(() => {
        // clear smth after each test
    });

    it('expect 2 + 2 to be 4', () => {
        expect(sum(2, 2)).toBe(4);
    });

    it('expect 5 + 4 to be 9', () => {
        expect(sum(5, 4)).toBe(9);
    });

    it('expect string params to throw error', () => {
        expect(() => sum('3', '2')).toThrow();
    });
});
