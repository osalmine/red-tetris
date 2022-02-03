import Board from './board';

export default class Player {
  name: string;
  roomName: string;
  isAdmin: boolean;
  state: 'pending' | 'playing' | 'finished';
  board: Board;

  constructor(playerName: string, roomName: string, { rows, cols }: {rows: number, cols: number}) {
    console.log('CONSTRUCT PLAYER');
    this.name = playerName;
    this.roomName = roomName;
    this.isAdmin = false;
    this.state = 'pending';
    this.board = new Board(rows, cols);
  }

  assignAdmin() {
    this.isAdmin = true;
  }
}
