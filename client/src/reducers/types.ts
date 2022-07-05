import { PieceName } from '../constants/pieces';

type Board = {
  field: number[][];
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

export type ActivePiece = {
  values: number[][];
  pieceXOffset: number;
  pieceYOffset: number;
  pieceType: PieceName;
};

export type PieceState = {
  activePiece?: ActivePiece | null;
};

export type ClientState = {
  playerName?: string;
  roomName?: string;
};
