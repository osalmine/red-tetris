import pieces, { PieceName } from '../constants/pieces';
import {
  AddNewActivePieceAction,
  AddPieceIndexAction,
  DropPieceAction,
  MovePieceDownAction,
  MovePieceLeftAction,
  MovePieceRigthAction,
  RotatePieceLeftAction,
  RotatePieceRightAction,
} from './types';
import * as internalEvents from '../constants/internalEvents';

const pieceInitialOffset = 3;

const getCenterOffset = (pieceCharacter: PieceName) => {
  switch (pieceCharacter) {
    case 'O':
    case 'J':
    case 'S':
    case 'T':
    case 'Z':
      return pieceInitialOffset + 1;
    case 'L':
    case 'I':
      return pieceInitialOffset;
    default:
      return pieceInitialOffset;
  }
};

const addNewActivePiece = (
  nextPieceCharacter: PieceName
): AddNewActivePieceAction => {
  const nextActivePiece = pieces[nextPieceCharacter];
  return {
    type: internalEvents.ACTIVE_PIECE,
    values: nextActivePiece,
    pieceXOffset: getCenterOffset(nextPieceCharacter),
    pieceYOffset: 0,
    pieceType: nextPieceCharacter,
  };
};

const movePieceDown = (): MovePieceDownAction => ({
  type: internalEvents.MOVE_DOWN,
});

const movePieceRigth = (): MovePieceRigthAction => ({
  type: internalEvents.MOVE_RIGHT,
});

const movePieceLeft = (): MovePieceLeftAction => ({
  type: internalEvents.MOVE_LEFT,
});

const rotatePieceRight = (): RotatePieceRightAction => ({
  type: internalEvents.ROTATE_RIGHT,
});

const rotatePieceLeft = (): RotatePieceLeftAction => ({
  type: internalEvents.ROTATE_LEFT,
});

const dropPiece = (): DropPieceAction => ({
  type: internalEvents.DROP_PIECE,
});

const addPieceIndex = (): AddPieceIndexAction => ({
  type: internalEvents.ADD_PIECE_INDEX,
});

export {
  addNewActivePiece,
  movePieceDown,
  movePieceRigth,
  movePieceLeft,
  rotatePieceRight,
  rotatePieceLeft,
  dropPiece,
  addPieceIndex,
};
