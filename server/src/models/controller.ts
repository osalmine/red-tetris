import debug from 'debug';

import Game from './Game';
import Player from './Player';
import params from '../../params';
import { GameNotFoundError, PlayerAlreadyExistsError } from './Error';

const logerror = debug('tetris:error');

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

  removeAllGames() {
    this.games.clear();
  }

  isGameOngoing(roomName: string) {
    if (this.gameExists(roomName)) {
      return this.getGame(roomName).roomState === 'playing';
    }
    return false;
  }

  addClientToRoom({ roomName, playerName }: { roomName: string; playerName: string }) {
    if (!this.gameExists(roomName)) {
      this.addGame(new Game(roomName));
    }
    const room = this.getGame(roomName);
    if (room.playerExists(playerName)) {
      logerror('Player already exists');
      throw new PlayerAlreadyExistsError(playerName);
    }
    room.addPlayer(new Player(playerName, roomName, params.board));
    if (!room.hasAdmin) {
      room.getPlayer(playerName).assignAdmin();
    }
  }

  resetGame(roomName: string) {
    if (!this.gameExists(roomName)) {
      throw new GameNotFoundError(roomName);
    }
    this.getGame(roomName).resetGame();
  }
}
