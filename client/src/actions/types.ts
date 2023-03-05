import * as internalEvents from '../constants/internalEvents';
import { Piece, GameState, Player, Board } from '../reducers/types';

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

type AddNewActivePieceAction = BaseAction<typeof internalEvents.ACTIVE_PIECE> &
  Piece;

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
  | ClientUpdateAction
  | StartGameAction
  | ClientEndGameAction
  | AddNewActivePieceAction
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
  ClientUpdateAction,
  StartGameAction,
  ClientEndGameAction,
  AddNewActivePieceAction,
  MovePieceDownAction,
  MovePieceRigthAction,
  MovePieceLeftAction,
  RotatePieceRightAction,
  RotatePieceLeftAction,
  DropPieceAction,
};
