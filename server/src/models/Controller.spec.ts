import Controller from './Controller';
import { GameNotFoundError, PlayerAlreadyExistsError } from './Error';
import Game from './Game';

describe('Controller', () => {
  let controller;

  beforeEach(() => {
    controller = new Controller();
  });

  it('adds a game', () => {
    const roomName = 'testRoom';
    expect(controller.games.get(roomName)).toBe(undefined);
    const game = new Game(roomName);
    controller.addGame(game);
    expect(controller.games.get(roomName)).toStrictEqual(game);
  });
  it('checks if a game exists', () => {
    const roomName = 'testRoom';
    const game = new Game(roomName);
    controller.addGame(game);
    expect(controller.gameExists(roomName)).toBe(true);
    expect(controller.gameExists('notExisting')).toBe(false);
  });
  it('gets a game by roomName', () => {
    const roomName = 'testRoom';
    const game = new Game(roomName);
    controller.addGame(game);
    expect(controller.getGame(roomName)).toStrictEqual(game);
    expect(controller.getGame('notExisting')).toBe(undefined);
  });
  it('removes a game by roomName', () => {
    const roomName = 'testRoom';
    const game = new Game(roomName);
    controller.addGame(game);
    expect(controller.getGame(roomName)).toStrictEqual(game);
    controller.removeGame(roomName);
    expect(controller.getGame(roomName)).toBe(undefined);
  });
  it('checks whether a game is ongoing', () => {
    const roomName = 'testRoom';
    const game = new Game(roomName);
    controller.addGame(game);
    expect(controller.isGameOngoing(roomName)).toBe(false);
    game.setGameToPlaying();
    expect(controller.isGameOngoing(roomName)).toBe(true);
  });
  it('returns false if game is not found when checking if a game is ongoing', () => {
    expect(controller.isGameOngoing('notFound')).toBe(false);
  });
  it('adds players to a room', () => {
    const roomName = 'roomName';
    const player1Name = 'player1';
    const player2Name = 'player2';

    expect(controller.gameExists(roomName)).toBe(false);
    controller.addClientToRoom({ roomName, playerName: player1Name });
    expect(controller.gameExists(roomName)).toBe(true);
    const game = controller.getGame(roomName);
    expect(game.getPlayer(player1Name).name).toBe(player1Name);
    expect(game.getPlayer(player1Name).isAdmin).toBe(true);

    controller.addClientToRoom({ roomName, playerName: player2Name });
    expect(game.getPlayer(player2Name).name).toBe(player2Name);
    expect(game.getPlayer(player2Name).isAdmin).toBe(false);
  });
  it('does not add same named player more than once to a room', () => {
    const roomName = 'roomName';
    const playerName = 'playerName';

    try {
      controller.addClientToRoom({ roomName, playerName });
      expect(controller.gameExists(roomName)).toBe(true);

      expect(
        controller.addClientToRoom({ roomName, playerName })
      ).toThrowError();
    } catch (e) {
      expect(e).toBeInstanceOf(PlayerAlreadyExistsError);
    }
  });
  it('resets a game', () => {
    const roomName = 'testRoom';
    const game = new Game(roomName);
    const gameSpy = jest.spyOn(game, 'resetGame');
    controller.addGame(game);
    controller.resetGame(roomName);
    expect(gameSpy).toHaveBeenCalled();
    gameSpy.mockClear();
  });
  it('throws an error if reseting a game that does not exist', () => {
    try {
      expect(controller.resetGame('notExisting')).toThrowError();
    } catch (e) {
      expect(e).toBeInstanceOf(GameNotFoundError);
    }
  });
});
