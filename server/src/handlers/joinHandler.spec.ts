import http from 'http';
import * as socketio from 'socket.io';
import Controller from '../models/Controller';
import { ClientToServerEvents, ServerToClientEvents } from '../types';
import joinHandler from './joinHandler';
import * as outgoingEvents from '../constants/outgoingEvents';
import {
  GameAlreadyStartedError,
  PlayerAlreadyExistsError,
} from '../models/Error';
import { socketClients } from '../routes/sockets';
import MockSocket from 'socket.io-mock';

describe('joinHandler', () => {
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

  afterEach(() => {
    controller.removeAllGames();
  });

  it('should join room', () => {
    const addClientToRoomSpy = jest.spyOn(controller, 'addClientToRoom');
    const mockSocket = new MockSocket();
    joinHandler({
      io: ioServer,
      controller,
      socket: mockSocket,
      socketClients,
    })({
      roomName,
      playerName,
    });
    expect(addClientToRoomSpy).toHaveBeenCalledWith({ roomName, playerName });
    expect(socketClients.get(mockSocket.id)).toStrictEqual({
      roomName,
      playerName,
    });
  });
  it('should throw error if game is ongoing', () => {
    const mockSocket = new MockSocket();
    const mockSocket2 = new MockSocket();
    const socketEmitSpy = jest.spyOn(mockSocket2, 'emit');

    joinHandler({
      io: ioServer,
      controller,
      socket: mockSocket,
      socketClients,
    })({
      roomName,
      playerName,
    });
    controller.getGame(roomName).setGameToPlaying();
    joinHandler({
      io: ioServer,
      controller,
      socket: mockSocket2,
      socketClients,
    })({
      roomName,
      playerName: 'testPlayer2',
    });

    expect(socketEmitSpy).toHaveBeenCalledWith(outgoingEvents.ERROR, {
      error: new GameAlreadyStartedError(roomName),
    });
  });
  it('should throw error if another player with the same name tries to join', () => {
    const mockSocket = new MockSocket();
    const mockSocket2 = new MockSocket();
    const socketEmitSpy = jest.spyOn(mockSocket2, 'emit');

    joinHandler({
      io: ioServer,
      controller,
      socket: mockSocket,
      socketClients,
    })({
      roomName,
      playerName,
    });
    joinHandler({
      io: ioServer,
      controller,
      socket: mockSocket2,
      socketClients,
    })({
      roomName,
      playerName,
    });

    expect(socketEmitSpy).toHaveBeenCalledWith(outgoingEvents.ERROR, {
      error: new PlayerAlreadyExistsError(playerName),
    });
  });
});
