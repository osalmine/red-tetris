import { spliceArrayToArray } from './spliceArrayToArray';

describe('spliceArrayToArray', () => {
  it('should splice an array into another array', () => {
    const array = [1, 2, 3, 4, 5];
    const splice = [6, 7, 8];
    const result = spliceArrayToArray({
      start: 2,
      targetArray: array,
      arrayToInsert: splice,
    });
    expect(result).toEqual([1, 2, 6, 7, 8]);
  });
  it('should splice an array into another array with ignore', () => {
    const array = [1, 2, 3, 4, 5];
    const splice = [0, 0, 6, 7, 8, 0];
    const result = spliceArrayToArray({
      start: 2,
      targetArray: array,
      arrayToInsert: splice,
      ignoreInInsertArray: 0,
    });
    expect(result).toEqual([1, 2, 3, 4, 6, 7, 8]);
  });
  it('should splice an array into another array with ignore without increasing size', () => {
    const array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const splice = [0, 1, 0];
    const result = spliceArrayToArray({
      start: 2,
      targetArray: array,
      arrayToInsert: splice,
      ignoreInInsertArray: 0,
    });
    expect(result.length).toBe(10);
    expect(result).toEqual([0, 0, 0, 1, 0, 0, 0, 0, 0, 0]);
  });
});
