import { CellType, EMPTY as E, FILLED as X } from './cellType';

const I: CellType[][] = [
  [E, E, X, E],
  [E, E, X, E],
  [E, E, X, E],
  [E, E, X, E],
];

const J: CellType[][] = [
  [E, X, E],
  [E, X, E],
  [X, X, E],
];

const L: CellType[][] = [
  [E, X, E],
  [E, X, E],
  [E, X, X],
];

const O: CellType[][] = [
  [X, X],
  [X, X],
];

/**
 * @todo Rotate to accurate start
 */
const S: CellType[][] = [
  [X, E, E],
  [X, X, E],
  [E, X, E],
];

/**
 * @todo Rotate to accurate start
 */
const T: CellType[][] = [
  [E, X, E],
  [X, X, E],
  [E, X, E],
];

/**
 * @todo Rotate to accurate start
 */
const Z: CellType[][] = [
  [E, X, E],
  [X, X, E],
  [X, E, E],
];

const pieces = { I, J, L, O, S, T, Z };

export type PieceName = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';
export const pieceNames: PieceName[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

export default pieces;
