import debug from 'debug';
import { PieceName } from '../constants/pieces';
import Board from './board';

const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info');

export default class Player {
  name: string;
  roomName: string;
  isAdmin: boolean;
  state: 'pending' | 'playing' | 'finished';
  board: Board;
  pieces: PieceName[];

  constructor(playerName: string, roomName: string, { rows, cols }: {rows: number; cols: number}) {
    console.log('CONSTRUCT PLAYER');
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

  addPieces(pieces: PieceName[]) {
    loginfo(`PLAYER METHOD addPieces ${pieces}`);
    loginfo(`PLAYER METHOD this.pieces ${this.pieces}`);
    this.pieces = [...this.pieces, ...pieces];
    loginfo(`PLAYER METHOD this.pieces ${this.pieces}`);
  }

  setState(state: typeof this.state) {
    this.state = state;
  }
}
