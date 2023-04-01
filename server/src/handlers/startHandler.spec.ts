import http from 'http';
import * as socketio from 'socket.io';
import Controller from '../models/Controller';
import { ClientToServerEvents, ServerToClientEvents } from '../types';
import startHandler from './startHandler';

describe('startHandler', () => {
  let httpServer: http.Server;
  let ioServer: socketio.Server<ClientToServerEvents, ServerToClientEvents>;

  const controller = new Controller();

  beforeAll((done) => {
    httpServer = http.createServer().listen();
    ioServer = new socketio.Server(httpServer);
    done();
  });

  afterAll((done) => {
    ioServer.close();
    httpServer.close();
    done();
  });

  const roomName = 'testRoom';
  const playerName = 'testPlayer';

  beforeEach((done) => {
    controller.addClientToRoom({ roomName, playerName });
    done();
  });

  afterEach((done) => {
    controller.removeAllGames();
    done();
  });

  it('should start the game', () => {
    const setGameToPlayingSpy = jest.spyOn(
      controller.getGame(roomName),
      'setGameToPlaying'
    );
    startHandler({ io: ioServer, controller })({
      roomName,
      initiator: playerName,
    });
    expect(setGameToPlayingSpy).toHaveBeenCalled();
  });
  it('should not start the game if initiator is not admin', () => {
    const setGameToPlayingSpy = jest.spyOn(
      controller.getGame(roomName),
      'setGameToPlaying'
    );
    const player2Name = 'testPlayer2';
    controller.addClientToRoom({ roomName, playerName: player2Name });
    startHandler({ io: ioServer, controller })({
      roomName,
      initiator: player2Name,
    });
    expect(setGameToPlayingSpy).not.toHaveBeenCalled();
  });
});
