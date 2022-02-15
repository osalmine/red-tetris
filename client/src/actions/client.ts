import pieces, { PieceName } from '../constants/pieces';
import { AddNewActivePieceAction, MovePieceDownAction } from './types';
import * as internalEvents from '../constants/internalEvents';

const addNewActivePiece = (nextPieceCharacter: PieceName): AddNewActivePieceAction => {
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

export { addNewActivePiece, movePieceDown };
