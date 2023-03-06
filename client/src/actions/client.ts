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
import { Board, Piece } from '../types';
import { pieceCanMoveDown } from '../reducers/pieceMovement/utils';

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

const getCurrentPlayerBoard = (): Board => {
  const {
    state: { players },
    player: { playerName },
  } = store.getState();
  return (
    players.find((player) => player.name === playerName)?.board ?? { field: [] }
  );
};

const defaultYOffset = -4;

const getNewPieceYOffset = (
  board: Board,
  piece: Omit<Piece, 'pieceYOffset'>,
  yOffset = defaultYOffset
): number => {
  if (
    yOffset === 0 ||
    !pieceCanMoveDown({
      piece: { ...piece, pieceYOffset: yOffset + 1 },
      field: board.field,
    })
  ) {
    return yOffset;
  }
  return getNewPieceYOffset(board, piece, yOffset + 1);
};

const addNewActivePiece = (
  nextPieceCharacter: PieceName
): AddNewActivePieceAction => {
  const currentPlayerBoard = getCurrentPlayerBoard();
  const nextActivePieceValues = pieces[nextPieceCharacter];
  const centerXOffset = getCenterOffset(nextPieceCharacter);
  const heightYOffset = getNewPieceYOffset(currentPlayerBoard, {
    values: nextActivePieceValues,
    pieceXOffset: centerXOffset,
    pieceType: nextPieceCharacter,
  });
  return {
    type: internalEvents.ACTIVE_PIECE,
    values: nextActivePieceValues,
    pieceXOffset: centerXOffset,
    pieceYOffset: heightYOffset ?? 0,
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
