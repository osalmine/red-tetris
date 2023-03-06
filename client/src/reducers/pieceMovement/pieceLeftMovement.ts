import { Piece } from '../../types';
import { pieceFirstColumnWithFilledCell } from './pieceDimensions';
import { isFieldBlocking } from './utils';

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
