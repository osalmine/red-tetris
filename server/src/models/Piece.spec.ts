/* eslint-disable no-magic-numbers */
import Piece from './Piece';

describe('Piece', () => {
  const piece = new Piece();

  it('should generate a batch', () => {
    const generateBatchSpy = jest.spyOn(piece, 'generateBatch');
    const batch = piece.generateBatch();
    expect(generateBatchSpy).toHaveBeenCalled();
    expect(batch).toBeArray();
    expect(batch.length).toBe(7);
    generateBatchSpy.mockClear();
  });
});
