import { mockPiece } from 'test/utils/mockStates';

import {
  pieceLastRowWithFilledCell,
  pieceFirstColumnWithFilledCell,
  pieceLastColumnWithFilledCell,
} from './pieceDimensions';

describe('pieceLastRowWithFilledCell', () => {
  it('should return the last row with a filled cell for I', () => {
    const { values } = mockPiece({}, 'I');
    expect(pieceLastRowWithFilledCell(values)).toEqual(3);
  });
  it('should return the last row with a filled cell for O', () => {
    const { values } = mockPiece({}, 'O');
    expect(pieceLastRowWithFilledCell(values)).toEqual(1);
  });
  it('should return the last row with a filled cell for S', () => {
    const { values } = mockPiece({}, 'S');
    expect(pieceLastRowWithFilledCell(values)).toEqual(2);
  });
});
describe('pieceFirstColumnWithFilledCell', () => {
  it('should return the first column with a filled cell for I', () => {
    const { values } = mockPiece({}, 'I');
    expect(pieceFirstColumnWithFilledCell(values)).toEqual(2);
  });
  it('should return the first column with a filled cell for O', () => {
    const { values } = mockPiece({}, 'O');
    expect(pieceFirstColumnWithFilledCell(values)).toEqual(0);
  });
  it('should return the first column with a filled cell for T', () => {
    const { values } = mockPiece({}, 'T');
    expect(pieceFirstColumnWithFilledCell(values)).toEqual(0);
  });
  it('should return the first column with a filled cell for L', () => {
    const { values } = mockPiece({}, 'L');
    expect(pieceFirstColumnWithFilledCell(values)).toEqual(1);
  });
});
describe('pieceLastColumnWithFilledCell', () => {
  it('should return the first column with a filled cell for I', () => {
    const { values } = mockPiece({}, 'I');
    expect(pieceLastColumnWithFilledCell(values)).toEqual(2);
  });
  it('should return the first column with a filled cell for O', () => {
    const { values } = mockPiece({}, 'O');
    expect(pieceLastColumnWithFilledCell(values)).toEqual(1);
  });
  it('should return the first column with a filled cell for T', () => {
    const { values } = mockPiece({}, 'T');
    expect(pieceLastColumnWithFilledCell(values)).toEqual(1);
  });
  it('should return the first column with a filled cell for L', () => {
    const { values } = mockPiece({}, 'L');
    expect(pieceLastColumnWithFilledCell(values)).toEqual(2);
  });
});
