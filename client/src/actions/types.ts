import * as internalEvents from '../constants/internalEvents';
import { UpdateState } from '../reducers/types';

type BaseAction<T> = {
  type: T;
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

type AddNewActivePieceAction = BaseAction<
  typeof internalEvents.ACTIVE_PIECE
> & {
  activePiece: number[][];
  pieceXOffset: number;
  pieceYOffset: number;
};

type MovePieceDownAction = BaseAction<typeof internalEvents.MOVE_DOWN>;
type MovePieceRigthAction = BaseAction<typeof internalEvents.MOVE_RIGHT>;
type MovePieceLeftAction = BaseAction<typeof internalEvents.MOVE_LEFT>;
type RotatePieceRightAction = BaseAction<typeof internalEvents.ROTATE_RIGHT>;
type RotatePieceLeftAction = BaseAction<typeof internalEvents.ROTATE_LEFT>;
type DropPieceAction = BaseAction<typeof internalEvents.DROP_PIECE>;

type AddPieceIndexAction = BaseAction<typeof internalEvents.ADD_PIECE_INDEX>;

type AllActions =
  | JoinRoomAction
  | UpdateAction
  | StartGameAction
  | AddNewActivePieceAction
  | MovePieceDownAction
  | MovePieceRigthAction
  | MovePieceLeftAction
  | RotatePieceRightAction
  | RotatePieceLeftAction
  | DropPieceAction
  | AddPieceIndexAction;

export type {
  AllActions,
  JoinRoomAction,
  UpdateAction,
  StartGameAction,
  AddNewActivePieceAction,
  MovePieceDownAction,
  MovePieceRigthAction,
  MovePieceLeftAction,
  RotatePieceRightAction,
  RotatePieceLeftAction,
  DropPieceAction,
  AddPieceIndexAction,
};
