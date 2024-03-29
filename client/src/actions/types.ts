import * as internalEvents from '../constants/internalEvents';
import { Piece, GameState, Player, Board } from '../types';

type BaseAction<T> = {
  type: T;
};

type JoinRoomAction = BaseAction<'joinRoom'> & {
  roomName: string;
  playerName: string;
};

type ServerUpdateAction = BaseAction<'serverUpdateState'> & {
  state: GameState;
};

type ServerResetGame = BaseAction<'serverResetGame'> & {
  state: GameState;
};

type ClientUpdateAction = BaseAction<'clientUpdateState'> & {
  roomName: string;
  playerState: Player;
};

type StartGameAction = BaseAction<'startGame'> & {
  roomName: string;
  initiator: string;
};

type ClientEndGameAction = BaseAction<'clientEndGame'> & {
  roomName: string;
  playerName: string;
};

type ResetGameAction = BaseAction<'resetGame'> & {
  roomName: string;
  initiator: string;
};

type BlockOpponentRowsAction = BaseAction<'blockOpponentRows'> & {
  roomName: string;
  playerName: string;
  numberOfBlockRows: number;
};

type AddNewActivePieceAction = BaseAction<typeof internalEvents.ACTIVE_PIECE> & Piece;

type AddNextPieceAction = BaseAction<typeof internalEvents.NEXT_PIECE> & {
  pieceType: Piece['pieceType'];
};

type MovePieceDownAction = BaseAction<typeof internalEvents.MOVE_DOWN> & {
  board: Board;
};
type MovePieceRigthAction = BaseAction<typeof internalEvents.MOVE_RIGHT> & {
  board: Board;
};
type MovePieceLeftAction = BaseAction<typeof internalEvents.MOVE_LEFT> & {
  board: Board;
};
type RotatePieceRightAction = BaseAction<typeof internalEvents.ROTATE_RIGHT> & {
  board: Board;
};
type RotatePieceLeftAction = BaseAction<typeof internalEvents.ROTATE_LEFT>;
type DropPieceAction = BaseAction<typeof internalEvents.DROP_PIECE> & {
  board: Board;
};

type AllActions =
  | JoinRoomAction
  | ServerUpdateAction
  | ServerResetGame
  | ClientUpdateAction
  | StartGameAction
  | ClientEndGameAction
  | ResetGameAction
  | BlockOpponentRowsAction
  | AddNewActivePieceAction
  | AddNextPieceAction
  | MovePieceDownAction
  | MovePieceRigthAction
  | MovePieceLeftAction
  | RotatePieceRightAction
  | RotatePieceLeftAction
  | DropPieceAction;

export type {
  AllActions,
  JoinRoomAction,
  ServerUpdateAction,
  ServerResetGame,
  ClientUpdateAction,
  StartGameAction,
  ClientEndGameAction,
  ResetGameAction,
  BlockOpponentRowsAction,
  AddNewActivePieceAction,
  AddNextPieceAction,
  MovePieceDownAction,
  MovePieceRigthAction,
  MovePieceLeftAction,
  RotatePieceRightAction,
  RotatePieceLeftAction,
  DropPieceAction,
};
