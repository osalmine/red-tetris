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
import { store } from '../store';

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

const movePieceDown = (): MovePieceDownAction => {
  const {
    state: { players },
    player: { playerName },
  } = store.getState();
  const currentPlayerBoard = players.find(
    (player) => player.name === playerName
  )?.board;
  return {
    type: internalEvents.MOVE_DOWN,
    board: currentPlayerBoard ?? { field: [] },
  };
};

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

const dropPiece = (): DropPieceAction => {
  const {
    state: { players },
    player: { playerName },
  } = store.getState();
  const currentPlayerBoard = players.find(
    (player) => player.name === playerName
  )?.board;
  return {
    type: internalEvents.DROP_PIECE,
    board: currentPlayerBoard ?? { field: [] },
  };
};

export {
  addNewActivePiece,
  movePieceDown,
  movePieceRigth,
  movePieceLeft,
  rotatePieceRight,
  rotatePieceLeft,
  dropPiece,
};
