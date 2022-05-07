import { UpdateState } from '../types';

type BaseAction<T> = {
  type: T;
};

type AlertAction = BaseAction<'ALERT_POP'> & {
  message: string;
};

type PingAction = {
  type: string;
};

type PongAction = BaseAction<'server/pong'> & {
  message: string;
};

type JoinRoomAction = BaseAction<'joinRoom'> & {
  roomName: string;
  playerName: string;
};

type UpdateAction = BaseAction<'serverUpdateState'> & {
  state: UpdateState;
};

type StartGameAction = BaseAction<'startGame'> & {
  roomName: string;
  initiator: string;
};

type AddNewActivePieceAction = BaseAction<'addNewActivePiece'> & {
  activePiece: number[][];
  pieceXOffset: number;
  pieceYOffset: number;
};

type MovePieceDownAction = BaseAction<'pieceMoveDown'>;

type RotatePieceLeftAction = BaseAction<'pieceRotateLeft'>;

type AllActions =
  | AlertAction
  | PingAction
  | PongAction
  | JoinRoomAction
  | UpdateAction
  | StartGameAction
  | AddNewActivePieceAction
  | MovePieceDownAction
  | RotatePieceLeftAction;

export type {
  AllActions,
  AlertAction,
  PingAction,
  PongAction,
  JoinRoomAction,
  UpdateAction,
  StartGameAction,
  AddNewActivePieceAction,
  MovePieceDownAction,
  RotatePieceLeftAction,
};
