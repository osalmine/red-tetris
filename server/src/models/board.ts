import { CellType, EMPTY } from '../constants/cellType';

export default class Board {
  field: CellType[][];

  constructor(rows: number, cols: number) {
    this.field = new Array(rows).fill(new Array(cols).fill(EMPTY));

    // console.log('this.field', this.field);
    // this.field[0][3] = 1;
    // console.log('this.field', this.field);
  }

  // constructor(rows: number, cols: number) {
  //   const fld = Array.from({ length: rows }, () => new Array(cols).fill(EMPTY));

  //   // fld[2][5] = 1;
  //   this.field = fld;
  // }
}
