import http from 'http';
import * as socketio from 'socket.io';
import socketioClient from 'socket.io-client';
import Controller from '../models/Controller';
import { ClientToServerEvents, ServerToClientEvents } from '../types';
import disconnectHandler from './disconnectHandler';
import * as outgoingEvents from '../constants/outgoingEvents';
import { socketClients } from '../routes/sockets';
import { AddressInfo } from 'net';
import { GameNotFoundError } from '../models/Error';

describe('disconnectHandler', () => {
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
      socketClients.set(socket.id, { roomName, playerName });
      done();
    });
  });

  afterEach(done => {
    controller.removeAllGames();
    socketClients.clear();
    if (socket.connected) {
      socket.disconnect();
    }
    done();
  });

  it('should remove a player from room and from socketClients and remove the game', () => {
    const removePlayerSpy = jest.spyOn(controller.getGame(roomName), 'removePlayer');
    const removeGameSpy = jest.spyOn(controller, 'removeGame');
    disconnectHandler({
      io: ioServer,
      controller,
      socket,
      socketClients,
    })();
    expect(removePlayerSpy).toHaveBeenCalledWith(playerName);
    expect(socketClients.has(socket.id)).toBe(false);
    expect(removeGameSpy).toHaveBeenCalledWith(roomName);
  });
  it('should not remove the room if game has still player and transfers admin', () => {
    const player2 = 'testPlayer2';
    controller.addClientToRoom({ roomName, playerName: player2 });
    const game = controller.getGame(roomName);
    const removePlayerSpy = jest.spyOn(game, 'removePlayer');
    const removeGameSpy = jest.spyOn(controller, 'removeGame');
    const assignAdminSpy = jest.spyOn(game.getPlayer(player2), 'assignAdmin');
    disconnectHandler({
      io: ioServer,
      controller,
      socket,
      socketClients,
    })();
    expect(removePlayerSpy).toHaveBeenCalledWith(playerName);
    expect(socketClients.has(socket.id)).toBe(false);
    expect(removeGameSpy).not.toHaveBeenCalledWith(roomName);
    expect(assignAdminSpy).toHaveBeenCalled();
  });
  it('should not remove the room if game has still player and not transfer admin', () => {
    const player2 = 'testPlayer2';
    controller.addClientToRoom({ roomName, playerName: player2 });
    const game = controller.getGame(roomName);
    const removePlayerSpy = jest.spyOn(game, 'removePlayer');
    const removeGameSpy = jest.spyOn(controller, 'removeGame');
    const assignAdminSpy = jest.spyOn(game.getPlayer(player2), 'assignAdmin');
    socketClients.set(socket.id, { roomName, playerName: player2 });
    disconnectHandler({
      io: ioServer,
      controller,
      socket,
      socketClients,
    })();
    expect(removePlayerSpy).toHaveBeenCalledWith(player2);
    expect(socketClients.has(socket.id)).toBe(false);
    expect(removeGameSpy).not.toHaveBeenCalledWith(roomName);
    expect(assignAdminSpy).not.toHaveBeenCalled();
  });
  it('should throw error if game does not exist', () => {
    const socketEmitSpy = jest.spyOn(socket, 'emit');

    const nonExistingRoom = 'nonExistingRoom';
    socketClients.set(socket.id, { roomName: nonExistingRoom, playerName });
    disconnectHandler({
      io: ioServer,
      controller,
      socket,
      socketClients,
    })();

    expect(socketEmitSpy).toHaveBeenCalledWith(outgoingEvents.ERROR, {
      error: new GameNotFoundError(nonExistingRoom),
    });
  });
});
