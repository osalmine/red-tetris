import { EMPTY as E, FILLED as X } from './cellType';

const I = [
  [E, E, X, E],
  [E, E, X, E],
  [E, E, X, E],
  [E, E, X, E],
];

const J = [
  [E, E, X, E],
  [E, E, X, E],
  [E, X, X, E],
  [E, E, E, E],
];

const L = [
  [E, X, E, E],
  [E, X, E, E],
  [E, X, X, E],
  [E, E, E, E],
];

const O = [
  [E, E, E, E],
  [E, X, X, E],
  [E, X, X, E],
  [E, E, E, E],
];

const S = [
  [E, X, E, E],
  [E, X, X, E],
  [E, E, X, E],
  [E, E, E, E],
];

const T = [
  [E, E, X, E],
  [E, X, X, E],
  [E, E, X, E],
  [E, E, E, E],
];

const Z = [
  [E, E, X, E],
  [E, X, X, E],
  [E, X, E, E],
  [E, E, E, E],
];

const pieces = [I, J, L, O, S, T, Z];

export const pieceNames = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
export type PieceName = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

export default pieces;
