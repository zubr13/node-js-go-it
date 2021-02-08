const forEach = require('./forEach');

describe('Should test each function', () => {
  it('should have length 2 of arguments [0, 1]', () => {
    const mockCallback = jest.fn((x) => 42 + x);
    forEach([0, 1], mockCallback);
    expect(mockCallback.mock.calls.length).toBe(2);
  });
});
