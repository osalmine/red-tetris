import params from '../../../params';
import { BLOCKED, EMPTY, FILLED } from '../../constants/cellType';
import Board from '../../models/Board';

export const emptyBoard: Board = {
  field: new Array(params.board.rows).fill(
    new Array(params.board.cols).fill(EMPTY)
  ),
};

export const boardWithFilledCells: Board = {
  field: emptyBoard.field.map((row, i) =>
    i % 3 ? row.map((col, j) => (j % 2 ? FILLED : col)) : row
  ),
};

export const emptyBoardWithTwoBlockedRows: Board = {
  field: [
    ...emptyBoard.field.slice(2),
    new Array(params.board.cols).fill(BLOCKED),
    new Array(params.board.cols).fill(BLOCKED),
  ],
};

export const boardWithFilledCellsAndTwoBlockedRows: Board = {
  field: [
    ...boardWithFilledCells.field.slice(2),
    new Array(params.board.cols).fill(BLOCKED),
    new Array(params.board.cols).fill(BLOCKED),
  ],
};
