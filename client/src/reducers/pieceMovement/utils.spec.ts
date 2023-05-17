import { mockBoard, mockPiece } from 'test/utils/mockStates';

import { isFieldBlocking } from './utils';
import { FILLED } from '../../constants/cellType';

describe('isFieldBlocking', () => {
  it('should return true when the field is blocking with O when moving left', () => {
    const piece = mockPiece({ pieceXOffset: 3 }, 'O');
    const { field } = mockBoard();
    field[0][2] = FILLED;

    expect(isFieldBlocking({ piece, field, direction: 'left' })).toEqual(true);
  });
  it('should return false when the field is not blocking T when moving left', () => {
    const piece = mockPiece({ pieceXOffset: 4 }, 'T');
    const { field } = mockBoard();
    field[0][3] = FILLED;

    expect(isFieldBlocking({ piece, field, direction: 'left' })).toEqual(false);
  });
  it('should return true when the field is blocking T when moving left', () => {
    const piece = mockPiece({ pieceXOffset: 4 }, 'T');
    const { field } = mockBoard();
    field[0][4] = FILLED;

    expect(isFieldBlocking({ piece, field, direction: 'left' })).toEqual(true);
  });
  it('should return true when the field is blocking O when moving right', () => {
    const piece = mockPiece({ pieceXOffset: 3 }, 'O');
    const { field } = mockBoard();
    field[0][5] = FILLED;

    expect(isFieldBlocking({ piece, field, direction: 'right' })).toEqual(true);
  });
  it('should return false when the field is not blocking L when moving right', () => {
    const piece = mockPiece({ pieceXOffset: 3 }, 'L');
    const { field } = mockBoard();
    field[1][6] = FILLED;
    console.log('field', field);

    expect(isFieldBlocking({ piece, field, direction: 'right' })).toEqual(false);
  });
  it('should return true when the field is blocking L when moving right', () => {
    const piece = mockPiece({ pieceXOffset: 3 }, 'L');
    const { field } = mockBoard();
    field[1][5] = FILLED;

    expect(isFieldBlocking({ piece, field, direction: 'right' })).toEqual(true);
  });
  it('should return true when the field is blocking O when moving down', () => {
    const piece = mockPiece({ pieceXOffset: 3 }, 'O');
    const { field } = mockBoard();
    field[2][3] = FILLED;

    expect(isFieldBlocking({ piece, field, direction: 'down' })).toEqual(true);
  });
  it('should return false when the field is not blocking Z when moving down', () => {
    const piece = mockPiece({ pieceXOffset: 3 }, 'Z');
    const { field } = mockBoard();
    field[3][5] = FILLED;

    expect(isFieldBlocking({ piece, field, direction: 'down' })).toEqual(true);
  });
  it('should return true when the field is blocking Z when moving down', () => {
    const piece = mockPiece({ pieceXOffset: 3 }, 'Z');
    const { field } = mockBoard();
    field[2][5] = FILLED;

    expect(isFieldBlocking({ piece, field, direction: 'down' })).toEqual(true);
  });
});
