import { PieceName } from './constants/pieces';
import {
  PlayerAlreadyExistsError,
  GameAlreadyStartedError,
} from './models/error';

type Board = {
  field: number[][];
};

export type PlayerT = {
  name: string;
  roomName: string;
  isAdmin: boolean;
  state: 'pending' | 'playing' | 'finished';
  pieces: PieceName[];
  board: Board;
};

type GameState = {
  roomState: 'pending' | 'playing' | 'finished';
  players: PlayerT[];
};

export type ServerToClientEvents = {
  serverUpdateState: ({ roomState, players }: GameState) => void;
  serverError: ({
    error,
  }: {
    error: PlayerAlreadyExistsError | GameAlreadyStartedError;
  }) => void;
};

export type ClientToServerEvents = {
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
  clientUpdateState: ({
    roomName,
    playerState,
  }: {
    roomName: string;
    playerState: PlayerT;
  }) => void;
};
