import { BLOCKED, EMPTY, FILLED } from '../../constants/cellType';
import params from '../../params';
import { Board } from '../../types';

export const emptyField: Board['field'] = Array.from({ length: params.board.rows }, () =>
  new Array(params.board.cols).fill(EMPTY),
);

export const fieldWithFilledCells: Board['field'] = emptyField.map((row, i) =>
  i % 3 ? row.map((col, j) => (j % 2 ? FILLED : col)) : row,
);

export const emptyFieldWithTwoBlockedRows: Board['field'] = [
  ...emptyField.slice(2),
  new Array(params.board.cols).fill(BLOCKED),
  new Array(params.board.cols).fill(BLOCKED),
];

export const fieldWithFilledCellsAndTwoBlockedRows: Board['field'] = [
  ...fieldWithFilledCells.slice(2),
  new Array(params.board.cols).fill(BLOCKED),
  new Array(params.board.cols).fill(BLOCKED),
];
