import { CellType, EMPTY as E, FILLED as X } from './cellType';

const I: CellType[][] = [
  [E, E, X, E],
  [E, E, X, E],
  [E, E, X, E],
  [E, E, X, E],
];

const J: CellType[][] = [
  [E, E, X, E],
  [E, E, X, E],
  [E, X, X, E],
  [E, E, E, E],
];

const L: CellType[][] = [
  [E, X, E, E],
  [E, X, E, E],
  [E, X, X, E],
  [E, E, E, E],
];

const O: CellType[][] = [
  [E, E, E, E],
  [E, X, X, E],
  [E, X, X, E],
  [E, E, E, E],
];

const S: CellType[][] = [
  [E, X, E, E],
  [E, X, X, E],
  [E, E, X, E],
  [E, E, E, E],
];

const T: CellType[][] = [
  [E, E, X, E],
  [E, X, X, E],
  [E, E, X, E],
  [E, E, E, E],
];

const Z: CellType[][] = [
  [E, E, X, E],
  [E, X, X, E],
  [E, X, E, E],
  [E, E, E, E],
];

const pieces = [I, J, L, O, S, T, Z];

export const pieceNames = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'] as const;
export type PieceName = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

export default pieces;
