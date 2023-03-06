import { PieceName } from './constants/pieces';

export type Board = {
  field: number[][];
  isOverflown?: boolean;
};

export type Player = {
  name: string;
  roomName: string;
  isAdmin: boolean;
  state: 'pending' | 'playing' | 'finished';
  pieces: PieceName[];
  board: Board;
};

export type GameState = {
  roomState: 'pending' | 'playing' | 'finished';
  players: Player[];
};

export type Piece = {
  values: number[][];
  pieceXOffset: number;
  pieceYOffset: number;
  pieceType: PieceName;
};

export type PieceState = {
  activePiece?: Piece | null;
  previousPiece?: Piece;
};

export type ClientState = {
  playerName?: string;
  roomName?: string;
};
export type PlayerAlreadyExistsError = {
  error: {
    name: 'PlayerAlreadyExistsError';
    data: {
      playerName: string;
    };
  };
};

export type GameAlreadyStartedError = {
  error: {
    name: 'GameAlreadyStartedError';
    data: {
      roomName: string;
    };
  };
};

export type GameNotFoundError = {
  error: {
    name: 'GameNotFoundError';
    data: {
      roomName: string;
    };
  };
};

export type Errors =
  | PlayerAlreadyExistsError
  | GameAlreadyStartedError
  | GameNotFoundError;
