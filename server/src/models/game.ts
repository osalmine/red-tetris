import { PieceName } from '../constants/pieces';
import { PlayerT } from '../types';
import { PlayerNotFoundError } from './Error';
import Piece from './Piece';
import Player from './Player';

type GameType = {
  getPlayer(playerName: string): Player;
};

export default class Game implements GameType {
  roomName: string;
  players: Player[];
  roomState: 'pending' | 'playing' | 'finished';
  pieceHandler: Piece;
  finishedPlayers: Player[];

  constructor(roomName: string) {
    this.roomName = roomName;
    this.players = [];
    this.roomState = 'pending';
    this.pieceHandler = new Piece();
    this.finishedPlayers = [];
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  playerExists(playerName: string) {
    return this.players.some(player => player.name === playerName);
  }

  getPlayer(playerName: string): Player | undefined {
    return this.players.find(player => player.name === playerName);
  }

  removePlayer(playerName: string) {
    if (this.playerExists(playerName)) {
      this.players.splice(this.players.indexOf(this.getPlayer(playerName)), 1);
    } else {
      throw new PlayerNotFoundError(`Could not remove ${playerName}`);
    }
  }

  setGameState(state: typeof this.roomState) {
    this.roomState = state;
  }

  setAllPlayersState(state: typeof this.roomState) {
    this.players.forEach(player => player.setState(state));
  }

  setGameToPlaying() {
    this.setGameState('playing');
    this.setAllPlayersState('playing');
  }

  addPiecesToPlayers(pieces: PieceName[]) {
    this.players.forEach(player => player.addPieces(pieces));
  }

  updatePlayerState(playerState: PlayerT) {
    const player = this.getPlayer(playerState.name);

    if (player) {
      player.setState(playerState.state);
      player.updateBoard(playerState.board);
      player.updatePieces(playerState.pieces);
    } else {
      throw new PlayerNotFoundError(`Could not update ${playerState.name}`);
    }
  }

  resetGame() {
    this.players.forEach(player => player.resetPlayer());
    this.finishedPlayers = [];
    this.setGameState('pending');
  }

  addBlockedRowsToOpponents(blockingInitiator: string, blockedRows: number) {
    this.players
      .filter(player => player.name !== blockingInitiator)
      .forEach(player => player.addBlockedRows(blockedRows));
  }

  addPlayerToFinishedPlayers(player: Player) {
    this.finishedPlayers.unshift(player);
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
    return null;
  }

  get isFinished() {
    return this.players.every(player => player.state === 'finished');
  }

  private static transformPlayers(players: Player[]) {
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
    return {
      roomState: this.roomState,
      players: Game.transformPlayers(this.players),
      finishedPlayers: Game.transformPlayers(this.finishedPlayers),
    };
  }
}
