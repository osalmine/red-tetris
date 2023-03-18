import { FILLED, BLOCKED } from '../constants/cellType';
import { PieceName } from '../constants/pieces';
import Board from './Board';

export default class Player {
  name: string;
  roomName: string;
  isAdmin: boolean;
  state: 'pending' | 'playing' | 'finished';
  board: Board;
  pieces: PieceName[];

  constructor(
    playerName: string,
    roomName: string,
    { rows, cols }: { rows: number; cols: number }
  ) {
    this.name = playerName;
    this.roomName = roomName;
    this.isAdmin = false;
    this.state = 'pending';
    this.board = new Board(rows, cols);
    this.pieces = [];
  }

  assignAdmin() {
    this.isAdmin = true;
  }

  updateBoard(board: typeof this.board) {
    this.board = board;
  }

  updatePieces(pieces: typeof this.pieces) {
    this.pieces = pieces;
  }

  addPieces(pieces: PieceName[]) {
    this.pieces = [...this.pieces, ...pieces];
  }

  setState(state: typeof this.state) {
    this.state = state;
  }

  resetPlayer() {
    this.setState('pending');
    this.pieces = [];

    // this.board.resetBoard();
  }

  addBlockedRows(blockedRows: number) {
    const cols = this.board.field[0].length;
    this.board.field = [
      ...this.board.field,
      ...new Array(blockedRows).fill(new Array(cols).fill(BLOCKED)),
    ];
    const removedRows = this.board.field.splice(0, blockedRows);
    const removedRowsHasFilledCell = removedRows.some((row) =>
      row.some((cell) => cell === FILLED)
    );
    if (removedRowsHasFilledCell) {
      this.setState('finished');
    }
  }
}
