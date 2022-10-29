import params from '../../params';
import { Piece } from '../types';

const pieceFirstColumnWithFilledCell = (pieceValues: number[][]) => {
  for (let col = 0; col < pieceValues.length; col++) {
    for (let row = 0; row < pieceValues[col].length; row++) {
      if (pieceValues[row][col] !== 0) {
        return col;
      }
    }
  }
  return pieceValues.length;
};

const pieceLastColumnWithFilledCell = (pieceValues: number[][]) => {
  for (let col = pieceValues.length - 1; col > 0; col--) {
    for (let row = 0; row < pieceValues[col].length; row++) {
      if (pieceValues[row][col] !== 0) {
        return col;
      }
    }
  }
  return pieceValues.length;
};

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

export const pieceCanMoveLeft = ({
  piece,
  field,
}: {
  piece: Piece;
  field: number[][];
}) => {
  const { pieceXOffset, values: pieceValues } = piece;
  const pieceRightColumn = pieceFirstColumnWithFilledCell(pieceValues);
  const hasSpaceToRotate = pieceXOffset + pieceRightColumn > 0;
  const filledPiecesLeft = isFieldBlocking({
    piece,
    field,
    direction: 'left',
  });
  if (hasSpaceToRotate && !filledPiecesLeft) {
    return true;
  }
  return false;
};

export const pieceCanMoveRight = ({
  piece,
  field,
}: {
  piece: Piece;
  field: number[][];
}) => {
  const { pieceXOffset, values: pieceValues } = piece;
  const pieceLeftColumn = pieceLastColumnWithFilledCell(pieceValues);
  const hasSpaceToRotate =
    pieceXOffset + pieceLeftColumn < params.board.cols - 1;
  const filledPiecesRight = isFieldBlocking({
    piece,
    field,
    direction: 'right',
  });
  if (hasSpaceToRotate && !filledPiecesRight) {
    return true;
  }
  return false;
};
