import { PieceName } from '../constants/pieces';

export type BoardValues = {
  field: number[][];
};

export type Player = {
  name: string;
  roomName: string;
  isAdmin: boolean;
  state: 'pending' | 'playing' | 'finished';
  pieces: PieceName[];
  board: BoardValues;
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
