import { Piece } from '../types';
import { pieceCanMoveDown } from './utils';

export const dropPieceGetYOffset = ({
  piece,
  field,
}: {
  piece: Piece;
  field: number[][];
}) => {
  const clonePiece = { ...piece };
  while (pieceCanMoveDown({ piece: clonePiece, field })) {
    clonePiece.pieceYOffset++;
  }
  console.log('clonePiece.pieceYOffset', clonePiece.pieceYOffset);
  return clonePiece.pieceYOffset;
};
