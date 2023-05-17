import http from 'http';
import * as socketio from 'socket.io';
import Controller from '../models/Controller';
import { ClientToServerEvents, ServerToClientEvents } from '../types';
import resetRoomHandler from './resetRoomHandler';
import socketioClient from 'socket.io-client';
import { AddressInfo } from 'net';
import * as outgoingEvents from '../constants/outgoingEvents';
import { GameAlreadyStartedError, GameNotFoundError } from '../models/Error';

describe('resetRoomHandler', () => {
  let httpServer: http.Server;
  let ioServer: socketio.Server<ClientToServerEvents, ServerToClientEvents>;
  let httpServerAddr: AddressInfo;
  let socket: socketio.Socket<ServerToClientEvents, ClientToServerEvents>;

  const controller = new Controller();

  beforeAll(done => {
    httpServer = http.createServer().listen();
    ioServer = new socketio.Server(httpServer);
    httpServerAddr = httpServer.address() as AddressInfo;
    done();
  });

  afterAll(done => {
    ioServer.close();
    httpServer.close();
    done();
  });

  const roomName = 'testRoom';
  const playerName = 'testPlayer';

  beforeEach(done => {
    controller.addClientToRoom({ roomName, playerName });

    const clientSocket = socketioClient(
      `http://[${httpServerAddr.address}]:${httpServerAddr.port}`,
    );

    clientSocket.on('connect', () => {
      socket = clientSocket as unknown as socketio.Socket<
        ServerToClientEvents,
        ClientToServerEvents
      >;
      done();
    });
  });

  afterEach(done => {
    controller.removeAllGames();
    if (socket.connected) {
      socket.disconnect();
    }
    done();
  });

  it('should reset room', () => {
    const resetGameSpy = jest.spyOn(controller, 'resetGame');
    resetRoomHandler({ io: ioServer, controller, socket })({
      roomName,
      initiator: playerName,
    });
    expect(resetGameSpy).toHaveBeenCalledWith(roomName);
  });
  it('should throw error if game is ongoing', () => {
    const socketEmitSpy = jest.spyOn(socket, 'emit');
    controller.getGame(roomName).setGameToPlaying();

    resetRoomHandler({ io: ioServer, controller, socket })({
      roomName,
      initiator: playerName,
    });

    expect(socketEmitSpy).toHaveBeenCalledWith(outgoingEvents.ERROR, {
      error: new GameAlreadyStartedError(roomName),
    });
  });
  it('should not reset room if initiator is not admin', () => {
    const resetGameSpy = jest.spyOn(controller, 'resetGame');
    const player2 = 'testPlayer2';
    controller.addClientToRoom({ roomName, playerName: player2 });

    expect(() =>
      resetRoomHandler({ io: ioServer, controller, socket })({
        roomName,
        initiator: player2,
      }),
    ).not.toThrowError();

    expect(resetGameSpy).not.toHaveBeenCalled();
  });
  it('should throw error if game does not exist', () => {
    const socketEmitSpy = jest.spyOn(socket, 'emit');

    const nonExistingRoom = 'nonExistingRoom';
    resetRoomHandler({ io: ioServer, controller, socket })({
      roomName: nonExistingRoom,
      initiator: playerName,
    });

    expect(socketEmitSpy).toHaveBeenCalledWith(outgoingEvents.ERROR, {
      error: new GameNotFoundError(nonExistingRoom),
    });
  });
});
