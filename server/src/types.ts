import { PieceName } from './constants/pieces';
import { PlayerAlreadyExistsError, GameAlreadyStartedError } from './models/error';

type BoardObject = {
  field: number[][];
};

type PlayerObject = {
  name: string;
  roomName: string;
  isAdmin: boolean;
  state: 'pending' | 'playing' | 'finished';
  pieces: PieceName[];
  board: BoardObject;
};

type UpdateState = {
  gameState: 'pending' | 'playing' | 'finished';
  players: PlayerObject[];
};

type ServerToClientEvents = {
  'server/pong': (arg: { message: string }) => void;
  serverUpdateState: ({ gameState, players }: UpdateState) => void;
  serverError: ({ error }: { error: PlayerAlreadyExistsError | GameAlreadyStartedError }) => void;
};

type BaseAction<T> = {
  type: T;
};

type PingAction = BaseAction<'server/ping'>;

type ClientToServerEvents = {
  action: (action: PingAction) => void;
  joinRoom: ({ roomName, playerName }: {roomName: string; playerName: string}) => void;
  startGame: ({ roomName, initiator }: {roomName: string; initiator: string}) => void;
};

export type { ServerToClientEvents, ClientToServerEvents };
