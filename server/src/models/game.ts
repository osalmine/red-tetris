import Player from './player';

type GameType = {
  getPlayer(playerName: string): Player;
};

export default class Game implements GameType {
  roomName: string;
  players: Player[];
  gameState: 'pending' | 'playing' | 'finished';

  constructor(roomName: string) {
    this.roomName = roomName;
    this.players = [];
    this.gameState = 'pending';
  }

  addPlayer(player: Player) {
    console.log(`ADD PLAYER" ${JSON.stringify(player)}`);
    this.players.push(player);
  }

  playerExists(playerName: string) {
    return this.players.some(player => player.name === playerName);
  }

  getPlayer(playerName: string) {
    return this.players.find(player => player.name === playerName);
  }

  private transformPlayersMap(players: Player[]) {
    return players.map(player => ({
      name: player.name,
      roomName: player.roomName,
      isAdmin: player.isAdmin,
      state: player.state,
    }));
  }

  get state() {
    return ({
      gameState: this.gameState,
      players: this.transformPlayersMap(this.players),
    });
  }
}
