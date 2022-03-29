import debug from 'debug';
import { PieceName } from '../constants/pieces';
import Piece from './piece';
import Player from './player';

type GameType = {
  getPlayer(playerName: string): Player;
};

const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info');

export default class Game implements GameType {
  roomName: string;
  players: Player[];
  gameState: 'pending' | 'playing' | 'finished';
  pieceHandler: Piece;

  constructor(roomName: string) {
    this.roomName = roomName;
    this.players = [];
    this.gameState = 'pending';
    this.pieceHandler = new Piece();
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  playerExists(playerName: string) {
    return this.players.some(player => player.name === playerName);
  }

  getPlayer(playerName: string) {
    return this.players.find(player => player.name === playerName);
  }

  removePlayer(playerName: string) {
    loginfo(`GAME METHOD removePlayer ${playerName}`);
    loginfo(`GAME METHOD this.playerExists(playerName) ${this.playerExists(playerName)}`);
    if (this.playerExists(playerName)) {
      this.players.splice(this.players.indexOf(this.getPlayer(playerName)), 1);
    }
    else {
      throw new Error(`Could not remove ${playerName}, player not found`);
    }
  }

  setGameState(state: typeof this.gameState) {
    this.gameState = state;
  }

  setAllPlayersState(state: typeof this.gameState) {
    this.players.forEach(player => player.setState(state));
  }

  setGameToPlaying() {
    this.setGameState('playing');
    this.setAllPlayersState('playing');
  }

  addPiecesToPlayers(pieces: PieceName[]) {
    this.players.forEach(player => player.addPieces(pieces));
  }

  get hasAdmin() {
    return this.players.some(player => player.isAdmin);
  }

  get hasPlayers() {
    return this.players.length !== 0;
  }

  get firstPlayer() {
    if (this.hasPlayers) {
      return this.players[0];
    }
  }

  private transformPlayers(players: Player[]) {
    return players.map(player => ({
      name: player.name,
      roomName: player.roomName,
      isAdmin: player.isAdmin,
      state: player.state,
      pieces: player.pieces,
      board: player.board,
    }));
  }

  get state() {
    return ({
      gameState: this.gameState,
      players: this.transformPlayers(this.players),
    });
  }
}
