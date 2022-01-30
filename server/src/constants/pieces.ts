import { EMPTY as O, FILLED as X } from './cellType'

const I = [
  [O, O, X, O],
  [O, O, X, O],
  [O, O, X, O],
  [O, O, X, O],
];

const J = [
  [O, O, X, O],
  [O, O, X, O],
  [O, X, X, O],
  [O, O, O, O],
];

const L = [
  [O, X, O, O],
  [O, X, O, O],
  [O, X, X, O],
  [O, O, O, O],
];

const O_ = [
  [O, O, O, O],
  [O, X, X, O],
  [O, X, X, O],
  [O, O, O, O],
];

const S = [
  [O, X, O, O],
  [O, X, X, O],
  [O, O, X, O],
  [O, O, O, O],
];

const T = [
  [O, O, X, O],
  [O, X, X, O],
  [O, O, X, O],
  [O, O, O, O],
];

const Z = [
  [O, O, X, O],
  [O, X, X, O],
  [O, X, O, O],
  [O, O, O, O],
];

const count = 7

export { I, J, L, O_ as O, S, T, Z, count }
