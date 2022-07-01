import { EMPTY as E, FILLED as X } from './cellType';

const I = [
  [E, E, X, E],
  [E, E, X, E],
  [E, E, X, E],
  [E, E, X, E],
];

const J = [
  [E, X, E],
  [E, X, E],
  [X, X, E],
];

const L = [
  [E, X, E],
  [E, X, E],
  [E, X, X],
];

const O = [
  [X, X],
  [X, X],
];

/**
 * @todo Rotate to accurate start
 */
const S = [
  [X, E, E],
  [X, X, E],
  [E, X, E],
];

/**
 * @todo Rotate to accurate start
 */
const T = [
  [E, X, E],
  [X, X, E],
  [E, X, E],
];

/**
 * @todo Rotate to accurate start
 */
const Z = [
  [E, X, E],
  [X, X, E],
  [X, E, E],
];

const pieces = { I, J, L, O, S, T, Z };

export type PieceName = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';
export const pieceNames: PieceName[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

export default pieces;
