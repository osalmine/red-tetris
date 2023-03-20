import {
  GameAlreadyStartedError,
  GameNotFoundError,
  PlayerAlreadyExistsError,
  PlayerNotFoundError,
} from './Error';

describe('Errors', () => {
  it('is PlayerNotFoundError', () => {
    try {
      throw new PlayerNotFoundError('Test');
    } catch (error) {
      expect(error).toBeInstanceOf(PlayerNotFoundError);
    }
  });
  it('is PlayerAlreadyExistsError', () => {
    try {
      throw new PlayerAlreadyExistsError('Test');
    } catch (error) {
      expect(error).toBeInstanceOf(PlayerAlreadyExistsError);
    }
  });
  it('is GameAlreadyStartedError', () => {
    try {
      throw new GameAlreadyStartedError('Test');
    } catch (error) {
      expect(error).toBeInstanceOf(GameAlreadyStartedError);
    }
  });
  it('is GameNotFoundError', () => {
    try {
      throw new GameNotFoundError('Test');
    } catch (error) {
      expect(error).toBeInstanceOf(GameNotFoundError);
    }
  });
});
