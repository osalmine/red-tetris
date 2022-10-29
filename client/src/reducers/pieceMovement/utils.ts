import params from '../../params';
import { Piece } from '../types';
import { pieceLastRowWithFilledCell } from './pieceDimensions';

const getDirectionOffset = (direction: 'down' | 'right' | 'left') => {
  switch (direction) {
    case 'down':
      return [1, 0];
    case 'right':
      return [0, 1];
    case 'left':
      return [0, -1];
    default:
      return [0, 0];
  }
};

export const isFieldBlocking = ({
  piece,
  field,
  direction,
}: {
  piece: Piece;
  field: number[][];
  direction: 'down' | 'right' | 'left';
}) => {
  const { pieceYOffset, pieceXOffset, values: pieceValues } = piece;
  const [rowOffset, colOffset] = getDirectionOffset(direction);
  return pieceValues.some((pieceRow, rowNb) =>
    pieceRow.some((pieceCol, colNb) => {
      if (
        pieceYOffset + rowNb + rowOffset < params.board.rows &&
        pieceCol === 1 &&
        field[pieceYOffset + rowNb + rowOffset][
          pieceXOffset + colNb + colOffset
        ] === 1
      ) {
        return true;
      }
      return false;
    })
  );
};

export const pieceCanMoveDown = ({
  piece,
  field,
}: {
  piece: Piece;
  field: number[][];
}) => {
  const { pieceYOffset, values: pieceValues } = piece;
  const actualPieceLength = pieceLastRowWithFilledCell(pieceValues);
  const fieldContinues =
    pieceYOffset + actualPieceLength < params.board.rows - 1;
  const noBlockingPieceDown = !isFieldBlocking({
    piece,
    field,
    direction: 'down',
  });
  if (fieldContinues && noBlockingPieceDown) {
    return true;
  }
  return false;
};
