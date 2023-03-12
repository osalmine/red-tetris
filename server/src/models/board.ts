import { CellType, EMPTY } from '../constants/cellType';

export default class Board {
  field: CellType[][];

  constructor(rows: number, cols: number) {
    this.field = new Array(rows).fill(new Array(cols).fill(EMPTY));
  }

  resetBoard() {
    const rows = this.field.length;
    const cols = rows > 0 ? this.field[0].length : 0;
    this.field = new Array(rows).fill(new Array(cols).fill(EMPTY));
  }
}
