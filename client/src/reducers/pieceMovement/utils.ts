import { BLOCKED, CellType, FILLED } from '../../constants/cellType';
import params from '../../params';
import { Piece } from '../../types';
import { pieceLastRowWithFilledCell } from './pieceDimensions';

const getDirectionOffset = (
  direction: 'down' | 'right' | 'left',
): [rowOffset: number, colOffset: number] => {
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
  field: CellType[][];
  direction: 'down' | 'right' | 'left';
}) => {
  const { pieceYOffset, pieceXOffset, values: pieceValues } = piece;
  const [rowOffset, colOffset] = getDirectionOffset(direction);
  return pieceValues.some((pieceRow, rowNb) =>
    pieceRow.some((pieceCol, colNb) => {
      const yCursor = pieceYOffset + rowNb + rowOffset;
      const xCursor = pieceXOffset + colNb + colOffset;
      if (
        yCursor >= 0 &&
        yCursor < params.board.rows &&
        pieceCol === 1 &&
        (field[yCursor][xCursor] === FILLED || field[yCursor][xCursor] === BLOCKED)
      ) {
        return true;
      }
      return false;
    }),
  );
};

export const pieceCanMoveDown = ({ piece, field }: { piece: Piece; field: CellType[][] }) => {
  const { pieceYOffset, values: pieceValues } = piece;
  const actualPieceLength = pieceLastRowWithFilledCell(pieceValues);
  const fieldContinues = pieceYOffset + actualPieceLength < params.board.rows - 1;
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
