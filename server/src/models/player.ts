import Board from './board';

export default class Player {
  name: string;
  roomName: string;
  isAdmin: boolean;
  board: Board

  constructor(playerName: string, roomName: string, { rows, cols }: {rows: number, cols: number}) {
    this.name = playerName;
    this.roomName = roomName;
    this.isAdmin = false;
    this.board = new Board(rows, cols)
  }
}
