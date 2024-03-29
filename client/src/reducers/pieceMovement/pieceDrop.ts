import { CellType } from '../../constants/cellType';
import { Piece } from '../../types';
import { pieceCanMoveDown } from './utils';

export const dropPieceGetYOffset = ({ piece, field }: { piece: Piece; field: CellType[][] }) => {
  const clonePiece = { ...piece };
  while (pieceCanMoveDown({ piece: clonePiece, field })) {
    clonePiece.pieceYOffset++;
  }
  return clonePiece.pieceYOffset;
};
