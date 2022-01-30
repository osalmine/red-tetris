import Player from './player'

type GameType = {
  getPlayer(playerName: string): Player;
}

export default class Game implements GameType {
  roomName: string;
  players: Map<string, Player>;

  constructor(roomName: string) {
    this.roomName = roomName;
    this.players = new Map<string, Player>();
  }

  addPlayer(player: Player) {
    console.log(`ADD PLAYER" ${JSON.stringify(player)}`)
    this.players.set(player.name, player);
  }

  playerExists(playerName: string) {
    return Boolean(this.players.get(playerName));
  }

  getPlayer(playerName: string) {
    return this.players.get(playerName);
  }
}
