/* eslint-disable no-magic-numbers */
import * as cellType from './cellType';

describe('cellTypes', () => {
  it('should match EMPTY to be 0', () => {
    expect(cellType.EMPTY).toBe(0);
  });
  it('should match FILLED to be 1', () => {
    expect(cellType.FILLED).toBe(1);
  });
  it('should match BLOCKED to be 2', () => {
    expect(cellType.BLOCKED).toBe(2);
  });
});
