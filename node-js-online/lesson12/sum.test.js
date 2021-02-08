const sum = require('./sum');

describe('Should test sum function', () => {
  it('should 2 + 2 equal 4', () => {
    expect(sum(2, 2)).toBe(4);
  });

  it('should 5 + 3 equal 8', () => {
    expect(sum(5, 3)).toBe(8);
  });

  it('should throw error for invalid params', () => {
    expect(() => sum('dsa', 'gfg')).toThrow();
  });
});
