export const sum2 = (a: number, b: number) => a + b;

describe('test', () => {
  it('should sum 2 + 3 to be 5', () => {
    expect(sum2(2, 3)).toBe(5);
  });
});
