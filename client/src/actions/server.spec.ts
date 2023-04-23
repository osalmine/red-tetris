import { mockGameState, mockPlayer } from 'test/utils/mockStates';

import {
  joinRoom,
  serverUpdateState,
  serverResetGame,
  clientUpdateState,
  startGame,
  endGame,
  resetGame,
  blockOpponentRows,
} from './server';
import * as incomingEvents from '../constants/incomingEvents';
import * as outgoingEvents from '../constants/outgoingEvents';
import { store } from '../store';

jest.mock('../store', () => {
  const store = jest.requireActual('../store');
  store.getState = jest.fn();
  return { store };
});

describe('Server actions', () => {
  const roomName = 'testRoom';
  const playerName = 'testPlayer';

  it('joinRoom should return a valid action', () => {
    const action = joinRoom({ roomName, playerName });
    expect(action).toStrictEqual({
      type: outgoingEvents.JOIN,
      roomName,
      playerName,
    });
  });

  it('serverUpdateState should return a valid action', () => {
    const gameState = mockGameState();

    const action = serverUpdateState(gameState);
    expect(action).toStrictEqual({
      type: incomingEvents.UPDATE,
      state: gameState,
    });
  });

  it('serverResetGame should return a valid action', () => {
    const gameState = mockGameState();

    const action = serverResetGame(gameState);
    expect(action).toStrictEqual({
      type: incomingEvents.RESET,
      state: gameState,
    });
  });

  it('clientUpdateState should return a valid action', () => {
    (store.getState as jest.Mock).mockImplementation(() => ({
      player: { playerName, roomName },
    }));
    const playerState = mockPlayer({ roomName });

    const action = clientUpdateState(playerState);
    expect(action).toStrictEqual({
      type: outgoingEvents.UPDATE,
      playerState,
      roomName,
    });
  });

  it('startGame should return a valid action', () => {
    const action = startGame({ roomName, playerName });
    expect(action).toStrictEqual({
      type: outgoingEvents.START,
      roomName,
      initiator: playerName,
    });
  });

  it('endGame should return a valid action', () => {
    const action = endGame({ roomName, playerName });
    expect(action).toStrictEqual({
      type: outgoingEvents.END,
      roomName,
      playerName,
    });
  });

  it('resetGame should return a valid action', () => {
    const action = resetGame({ roomName, playerName });
    expect(action).toStrictEqual({
      type: outgoingEvents.RESET,
      roomName,
      initiator: playerName,
    });
  });

  it('blockOpponentRows should return a valid action', () => {
    const numberOfBlockRows = 2;
    const action = blockOpponentRows({
      roomName,
      playerName,
      numberOfBlockRows,
    });
    expect(action).toStrictEqual({
      type: outgoingEvents.BLOCK,
      roomName,
      playerName,
      numberOfBlockRows,
    });
  });
});
