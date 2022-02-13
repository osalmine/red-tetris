import pieces, { PieceName } from '../constants/pieces';
import { AddNewActivePieceAction } from './types';
import * as internalEvents from '../constants/internalEvents';

const addNewActivePiece = (nextPieceCharacter: PieceName): AddNewActivePieceAction => {
  const activePiece = pieces[nextPieceCharacter];
  return {
    type: internalEvents.ACTIVE_PIECE,
    activePiece,
    pieceXOffset: 0,
    pieceYOffset: 0,
  };
};

export { addNewActivePiece };
