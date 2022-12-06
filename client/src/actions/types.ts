import * as internalEvents from '../constants/internalEvents';
import { Piece, GameState, Player, BoardValues } from '../reducers/types';

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
  board: BoardValues;
};
type MovePieceRigthAction = BaseAction<typeof internalEvents.MOVE_RIGHT> & {
  board: BoardValues;
};
type MovePieceLeftAction = BaseAction<typeof internalEvents.MOVE_LEFT> & {
  board: BoardValues;
};
type RotatePieceRightAction = BaseAction<typeof internalEvents.ROTATE_RIGHT> & {
  board: BoardValues;
};
type RotatePieceLeftAction = BaseAction<typeof internalEvents.ROTATE_LEFT>;
type DropPieceAction = BaseAction<typeof internalEvents.DROP_PIECE> & {
  board: BoardValues;
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
