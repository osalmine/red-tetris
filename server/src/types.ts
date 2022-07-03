import { PieceName } from './constants/pieces';
import {
  PlayerAlreadyExistsError,
  GameAlreadyStartedError,
} from './models/error';

type Board = {
  field: number[][];
};

type PlayerObject = {
  name: string;
  roomName: string;
  isAdmin: boolean;
  state: 'pending' | 'playing' | 'finished';
  pieces: PieceName[];
  board: Board;
};

type GameState = {
  roomState: 'pending' | 'playing' | 'finished';
  players: PlayerObject[];
};

type ServerToClientEvents = {
  serverUpdateState: ({ roomState, players }: GameState) => void;
  serverError: ({
    error,
  }: {
    error: PlayerAlreadyExistsError | GameAlreadyStartedError;
  }) => void;
};

type ClientToServerEvents = {
  joinRoom: ({
    roomName,
    playerName,
  }: {
    roomName: string;
    playerName: string;
  }) => void;
  startGame: ({
    roomName,
    initiator,
  }: {
    roomName: string;
    initiator: string;
  }) => void;
  clientUpdateState: (gameState: GameState) => void;
};

export type { ServerToClientEvents, ClientToServerEvents };
