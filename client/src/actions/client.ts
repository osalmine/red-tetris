import pieces, { PieceName } from '../constants/pieces';
import {
  AddNewActivePieceAction,
  DropPieceAction,
  MovePieceDownAction,
  MovePieceLeftAction,
  MovePieceRigthAction,
  RotatePieceLeftAction,
  RotatePieceRightAction,
} from './types';
import * as internalEvents from '../constants/internalEvents';

const addNewActivePiece = (
  nextPieceCharacter: PieceName
): AddNewActivePieceAction => {
  const activePiece = pieces[nextPieceCharacter];
  const centerPieceOffset = 3;
  return {
    type: internalEvents.ACTIVE_PIECE,
    activePiece,
    pieceXOffset: centerPieceOffset,
    pieceYOffset: nextPieceCharacter === 'O' ? -1 : 0,
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

export {
  addNewActivePiece,
  movePieceDown,
  movePieceRigth,
  movePieceLeft,
  rotatePieceRight,
  rotatePieceLeft,
  dropPiece,
};
