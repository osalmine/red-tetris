import { UpdateState } from '../types';

type BaseAction<T> = {
  type: T
};

type AlertAction = BaseAction<'ALERT_POP'> & {
  message: string
};

type PingAction = {
  type: string
};

type PongAction = BaseAction<'server/pong'> & {
  message: string
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

type AllActions = AlertAction | PingAction | PongAction | JoinRoomAction | UpdateAction | StartGameAction;

export type { AllActions, AlertAction, PingAction, PongAction, JoinRoomAction, UpdateAction, StartGameAction };
