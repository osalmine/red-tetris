import { CellType } from '../../constants/cellType';
import { Piece } from '../../types';
import { pieceCanMoveLeft } from './pieceLeftMovement';
import { pieceCanMoveRight } from './pieceRightMovement';

export const pieceCanRotate = ({ piece, field }: { piece: Piece; field: CellType[][] }) =>
  pieceCanMoveLeft({
    piece: {
      ...piece,
      pieceXOffset: piece.pieceXOffset + 1,
    },
    field,
  }) &&
  pieceCanMoveRight({
    piece: {
      ...piece,
      pieceXOffset: piece.pieceXOffset - 1,
    },
    field,
  });

export const rotatePieceRight = ({ values, pieceType }: Piece) => {
  /**
   * No need to rotate
   */
  if (pieceType === 'O') {
    return values;
  }

  const rotatedPiece = values[0].map((_, index) => values.map(row => row[index]).reverse());
  return rotatedPiece;
};
