import { EMPTY } from '../constants/cellType';

export default class Board {
  field: number[][];

  constructor(rows: number, cols: number) {
    this.field = new Array(rows).fill(new Array(cols).fill(EMPTY));
  }
}
