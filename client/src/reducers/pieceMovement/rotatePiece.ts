import { Piece } from '../types';
import { pieceCanMoveLeft, pieceCanMoveRight } from './utils';

export const pieceCanRotate = ({
  piece,
  field,
}: {
  piece: Piece;
  field: number[][];
}) =>
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

  const rotatedPiece = [...Array(values.length)].map(() =>
    Array(values.length).fill(0)
  );

  for (let col = 0; col < values.length; col++) {
    for (let row = 0; row < values[col].length; row++) {
      rotatedPiece[col][row] = values[row][col];
    }
  }
  const reversedRotatedPiece = rotatedPiece.map((row) => row.reverse());
  return reversedRotatedPiece;
};
