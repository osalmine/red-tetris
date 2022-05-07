import { PieceName } from './constants/pieces';

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

type PlayerAlreadyExistsError = {
  error: {
    name: 'PlayerAlreadyExistsError';
    data: {
      playerName: string;
    };
  };
};

type GameAlreadyStartedError = {
  error: {
    name: 'GameAlreadyStartedError';
    data: {
      roomName: string;
    };
  };
};

type Errors = PlayerAlreadyExistsError | GameAlreadyStartedError;

export type {
  UpdateState,
  Errors,
  PlayerAlreadyExistsError,
  GameAlreadyStartedError,
};
