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
import { BoardValues } from '../reducers/types';

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

const getCurrentPlayerBoard = (): BoardValues => {
  const {
    state: { players },
    player: { playerName },
  } = store.getState();
  return (
    players.find((player) => player.name === playerName)?.board ?? { field: [] }
  );
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
  const currentPlayerBoard = getCurrentPlayerBoard();
  return {
    type: internalEvents.MOVE_DOWN,
    board: currentPlayerBoard,
  };
};

const movePieceRigth = (): MovePieceRigthAction => {
  const currentPlayerBoard = getCurrentPlayerBoard();
  return {
    type: internalEvents.MOVE_RIGHT,
    board: currentPlayerBoard,
  };
};

const movePieceLeft = (): MovePieceLeftAction => {
  const currentPlayerBoard = getCurrentPlayerBoard();
  return {
    type: internalEvents.MOVE_LEFT,
    board: currentPlayerBoard,
  };
};

const rotatePieceRight = (): RotatePieceRightAction => {
  const currentPlayerBoard = getCurrentPlayerBoard();
  return {
    type: internalEvents.ROTATE_RIGHT,
    board: currentPlayerBoard,
  };
};

const rotatePieceLeft = (): RotatePieceLeftAction => ({
  type: internalEvents.ROTATE_LEFT,
});

const dropPiece = (): DropPieceAction => {
  const currentPlayerBoard = getCurrentPlayerBoard();
  return {
    type: internalEvents.DROP_PIECE,
    board: currentPlayerBoard,
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
