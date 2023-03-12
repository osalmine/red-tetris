import { CellType } from '../../constants/cellType';
import params from '../../params';
import { Piece } from '../../types';
import { pieceLastColumnWithFilledCell } from './pieceDimensions';
import { isFieldBlocking } from './utils';

export const pieceCanMoveRight = ({
  piece,
  field,
}: {
  piece: Piece;
  field: CellType[][];
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
