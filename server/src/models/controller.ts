import Game from './game'
import Player from './player';

export default class Controller {
  games: Map<string, Game>;

  // players: Map<string, Player>

  constructor() {
    this.games = new Map<string, Game>()

    // this.players = new Map<string, Player>()
  }

  addGame(game: Game) {
    this.games.set(game.roomName, game);
  }

  gameExists(roomName: string) {
    return this.games.get(roomName)
  }
}
