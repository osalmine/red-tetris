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
    this.players.set(player.name, player);
  }

  getPlayer(playerName: string) {
    return this.players.get(playerName);
  }
}
