import { PieceName } from './constants/pieces';
import Board from './models/Board';
import {
  PlayerAlreadyExistsError,
  PlayerNotFoundError,
  GameAlreadyStartedError,
  GameNotFoundError,
} from './models/Error';

export type PlayerT = {
  name: string;
  roomName: string;
  isAdmin: boolean;
  state: 'pending' | 'playing' | 'finished';
  pieces: PieceName[];
  board: Board;
};

export type GameState = {
  roomState: 'pending' | 'playing' | 'finished';
  players: PlayerT[];
  finishedPlayers: PlayerT[];
};

export type SocketClients = Map<
  string,
  {
    roomName: string;
    playerName: string;
  }
>;

export type ServerToClientEvents = {
  serverUpdateState: ({ roomState, players, finishedPlayers }: GameState) => void;
  serverResetGame: ({ roomState, players, finishedPlayers }: GameState) => void;
  serverError: ({
    error,
  }: {
    error:
      | PlayerAlreadyExistsError
      | PlayerNotFoundError
      | GameAlreadyStartedError
      | GameNotFoundError;
  }) => void;
};

export type ClientToServerEvents = {
  joinRoom: ({ roomName, playerName }: { roomName: string; playerName: string }) => void;
  startGame: ({ roomName, initiator }: { roomName: string; initiator: string }) => void;
  clientUpdateState: ({
    roomName,
    playerState,
  }: {
    roomName: string;
    playerState: PlayerT;
  }) => void;
  clientEndGame: ({ roomName, playerName }: { roomName: string; playerName: string }) => void;
  resetGame: ({ roomName, initiator }: { roomName: string; initiator: string }) => void;
  blockOpponentRows: ({
    roomName,
    playerName,
    numberOfBlockRows,
  }: {
    roomName: string;
    playerName: string;
    numberOfBlockRows: number;
  }) => void;
};
