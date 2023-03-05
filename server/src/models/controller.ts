import debug from 'debug';

import Game from './game';
import Player from './player';
import params from '../../params';
import { GameNotFoundError, PlayerAlreadyExistsError } from './error';

const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info');

export default class Controller {
  games: Map<string, Game>;

  constructor() {
    this.games = new Map<string, Game>();
  }

  addGame(game: Game) {
    this.games.set(game.roomName, game);
  }

  gameExists(roomName: string) {
    return Boolean(this.games.get(roomName));
  }

  getGame(roomName: string) {
    return this.games.get(roomName);
  }

  removeGame(roomName: string) {
    if (this.gameExists(roomName)) {
      this.games.delete(roomName);
    }
  }

  isGameOngoing(roomName: string) {
    if (this.gameExists(roomName)) {
      return this.getGame(roomName).roomState === 'playing';
    }
    return false;
  }

  addClientToRoom({
    roomName,
    playerName,
  }: {
    roomName: string;
    playerName: string;
  }) {
    loginfo(`JOIN ROOM: room: ${roomName} player: ${playerName}`);
    if (!this.gameExists(roomName)) {
      this.addGame(new Game(roomName));
    }
    const room = this.getGame(roomName);
    if (room.playerExists(playerName)) {
      logerror('Player already exists');
      throw new PlayerAlreadyExistsError(playerName);
    }
    room.addPlayer(new Player(playerName, roomName, params.board));
    loginfo(`Room hasAdmin: ${room.hasAdmin}`);
    if (!room.hasAdmin) {
      room.getPlayer(playerName).assignAdmin();
      loginfo(`Room hasAdmin: ${room.hasAdmin}`);
    }
  }

  resetGame(roomName: string) {
    if (!this.gameExists(roomName)) {
      throw new GameNotFoundError(roomName);
    }
    this.getGame(roomName).resetGame();
  }
}
