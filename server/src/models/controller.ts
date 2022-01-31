import Game from './game';

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
}
