import {
  boardWithFilledCells,
  emptyBoard,
  emptyBoardWithTwoBlockedRows,
  getPlayerState,
  piecesBatch,
} from 'test/utils';
import params from '../../params';
import { PlayerNotFoundError } from './Error';
import Game from './Game';
import Player from './Player';

describe('Game', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game('testRoom');
  });

  it('adds a player to the room', () => {
    expect(game.players).toStrictEqual([]);
    const player = new Player('testName', 'testRoom', params.board);
    game.addPlayer(player);
    expect(game.players).toStrictEqual([player]);
  });
  it('checks if a player exists', () => {
    const playerName = 'testName';
    expect(game.playerExists(playerName)).toBe(false);
    const player = new Player(playerName, 'testRoom', params.board);
    game.addPlayer(player);
    expect(game.playerExists(playerName)).toBe(true);
  });
  it('gets a player by name', () => {
    const playerName = 'testName';
    expect(game.getPlayer(playerName)).toBe(undefined);
    const player = new Player(playerName, 'testRoom', params.board);
    game.addPlayer(player);
    expect(game.getPlayer(playerName)).toStrictEqual(player);
  });
  it('removes a player', () => {
    const playerName = 'testName';
    const player = new Player(playerName, 'testRoom', params.board);
    game.addPlayer(player);
    expect(game.playerExists(playerName)).toBe(true);
    game.removePlayer(playerName);
    expect(game.playerExists(playerName)).toBe(false);
  });
  it('throws an error when removing a non existing player', () => {
    const playerName = 'testName';
    try {
      game.removePlayer(playerName);
      expect(game.playerExists(playerName)).toThrowError();
    } catch (e) {
      expect(e).toBeInstanceOf(PlayerNotFoundError);
    }
  });
  it('sets game state', () => {
    expect(game.roomState).toBe('pending');
    game.setGameState('playing');
    expect(game.roomState).toBe('playing');
  });
  it('sets the state of all players', () => {
    const player1 = new Player('player1', 'testRoom', params.board);
    const player2 = new Player('player2', 'testRoom', params.board);
    expect(player1.state).toBe('pending');
    expect(player2.state).toBe('pending');
    game.addPlayer(player1);
    game.addPlayer(player2);
    game.setAllPlayersState('playing');
    expect(player1.state).toBe('playing');
    expect(player2.state).toBe('playing');
  });
  it('sets game to playing state', () => {
    const player1 = new Player('player1', 'testRoom', params.board);
    const player2 = new Player('player2', 'testRoom', params.board);
    expect(player1.state).toBe('pending');
    expect(player2.state).toBe('pending');
    game.addPlayer(player1);
    game.addPlayer(player2);
    expect(game.roomState).toBe('pending');
    game.setGameToPlaying();
    expect(player1.state).toBe('playing');
    expect(player2.state).toBe('playing');
    expect(game.roomState).toBe('playing');
  });
  it('adds pieces to players', () => {
    const player1 = new Player('player1', 'testRoom', params.board);
    const player2 = new Player('player2', 'testRoom', params.board);
    expect(player1.pieces).toStrictEqual([]);
    expect(player2.pieces).toStrictEqual([]);
    game.addPlayer(player1);
    game.addPlayer(player2);
    game.addPiecesToPlayers(piecesBatch);
    expect(player1.pieces).toStrictEqual(piecesBatch);
    expect(player2.pieces).toStrictEqual(piecesBatch);
  });
  it('updates player state', () => {
    const newState = 'playing';
    const newBoard = boardWithFilledCells;
    const newPieces = piecesBatch;
    const playerNewState = getPlayerState({
      state: newState,
      board: newBoard,
      pieces: newPieces,
    });

    const player = new Player('testName', 'testRoom', params.board);
    game.addPlayer(player);
    expect(player.state).toBe('pending');
    expect(player.board.field).toStrictEqual(emptyBoard.field);
    expect(player.pieces).toStrictEqual([]);
    game.updatePlayerState(playerNewState);
    expect(player.state).toBe(newState);
    expect(player.board).toStrictEqual(newBoard);
    expect(player.pieces).toStrictEqual(newPieces);
  });
  it('throws an error if player is not found in update player state', () => {
    const playerState = getPlayerState();
    try {
      expect(game.updatePlayerState(playerState)).toThrowError();
    } catch (e) {
      expect(e).toBeInstanceOf(PlayerNotFoundError);
    }
  });
  it('resets the game', () => {
    const player1 = new Player('player1', 'testRoom', params.board);
    const player2 = new Player('player2', 'testRoom', params.board);
    game.addPlayer(player1);
    game.addPlayer(player2);
    game.setGameToPlaying();
    expect(game.roomState).toBe('playing');
    expect(player1.state).toBe('playing');
    expect(player2.state).toBe('playing');
    game.resetGame();
    expect(game.roomState).toBe('pending');
    expect(player1.state).toBe('pending');
    expect(player2.state).toBe('pending');
  });
  it('adds blocked rows to opponents', () => {
    const player1Name = 'player1';
    const player2Name = 'player2';
    const player1 = new Player(player1Name, 'testRoom', params.board);
    const player2 = new Player(player2Name, 'testRoom', params.board);
    game.addPlayer(player1);
    game.addPlayer(player2);
    expect(player1.board.field).toStrictEqual(emptyBoard.field);
    expect(player2.board.field).toStrictEqual(emptyBoard.field);
    game.addBlockedRowsToOpponents(player1Name, 2);
    expect(player1.board.field).toStrictEqual(emptyBoard.field);
    expect(player2.board.field).toStrictEqual(emptyBoardWithTwoBlockedRows.field);
  });
  it('adds a player to finished players', () => {
    const player = new Player('testName', 'testRoom', params.board);
    game.addPlayer(player);
    expect(game.finishedPlayers).toStrictEqual([]);
    game.addPlayerToFinishedPlayers(player);
    expect(game.finishedPlayers).toStrictEqual([player]);
  });
  it('gets whether game has admin', () => {
    const player = new Player('testName', 'testRoom', params.board);
    game.addPlayer(player);
    expect(player.isAdmin).toBe(false);
    player.assignAdmin();
    expect(game.hasAdmin).toBe(true);
  });
  it('gets whether game has players', () => {
    expect(game.hasPlayers).toBe(false);
    const player = new Player('testName', 'testRoom', params.board);
    game.addPlayer(player);
    expect(game.hasPlayers).toBe(true);
  });
  it('gets the first player', () => {
    expect(game.firstPlayer).toBe(null);
    const player1 = new Player('player1', 'testRoom', params.board);
    const player2 = new Player('player2', 'testRoom', params.board);
    game.addPlayer(player1);
    game.addPlayer(player2);
    expect(game.firstPlayer).toStrictEqual(player1);
  });
  it('gets whether the game is finished', () => {
    const player1 = new Player('player1', 'testRoom', params.board);
    const player2 = new Player('player2', 'testRoom', params.board);
    game.addPlayer(player1);
    game.addPlayer(player2);
    expect(game.isFinished).toBe(false);
    player1.setState('finished');
    expect(game.isFinished).toBe(false);
    player2.setState('finished');
    expect(game.isFinished).toBe(true);
  });
  it('gets game state', () => {
    const player1Name = 'player1';
    const player2Name = 'player2';
    const roomName = 'testRoom';
    const player1State = getPlayerState({ name: player1Name, roomName });
    const player2State = getPlayerState({
      name: player2Name,
      roomName,
    });
    const player1 = new Player(player1Name, roomName, params.board);
    const player2 = new Player(player2Name, roomName, params.board);
    game.addPlayer(player1);
    game.addPlayer(player2);
    expect(game.state).toStrictEqual({
      roomState: 'pending',
      players: [player1State, player2State],
      finishedPlayers: [],
    });
  });
});
