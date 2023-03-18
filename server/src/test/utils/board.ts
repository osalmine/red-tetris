/* eslint-disable no-magic-numbers */
import params from '../../../params';
import { EMPTY, FILLED } from '../../constants/cellType';

export const emptyBoard = {
  field: new Array(params.board.rows).fill(
    new Array(params.board.cols).fill(EMPTY)
  ),
};

export const boardWithFilledCells = {
  field: emptyBoard.field.map((row, i) =>
    i % 3 ? row.map((col, j) => (j % 2 ? FILLED : col)) : row
  ),
};
