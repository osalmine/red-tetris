import { PieceName } from '../constants/pieces';

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

export type UpdateState = {
  gameState: 'pending' | 'playing' | 'finished';
  players: PlayerObject[];
};

export type ActivePiece = {
  values: number[][];
  pieceXOffset: number;
  pieceYOffset: number;
};

export type PieceState = {
  activePiece?: ActivePiece | null;
};

export type ClientState = {
  playerName?: string;
  roomName?: string;
  pieceIndex?: number;
};
