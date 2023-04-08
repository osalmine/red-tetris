import http from 'http';
import * as socketio from 'socket.io';
import Controller from '../models/Controller';
import { ClientToServerEvents, PlayerT, ServerToClientEvents } from '../types';
import updateHandler from './updateHandler';
import socketioClient from 'socket.io-client';
import { AddressInfo } from 'net';
import * as outgoingEvents from '../constants/outgoingEvents';
import { GameNotFoundError, PlayerNotFoundError } from '../models/Error';
import { emptyBoard } from 'test/utils';

describe('updateHandler', () => {
  let httpServer: http.Server;
  let ioServer: socketio.Server<ClientToServerEvents, ServerToClientEvents>;
  let httpServerAddr: AddressInfo;
  let socket: socketio.Socket<ServerToClientEvents, ClientToServerEvents>;

  const controller = new Controller();

  beforeAll((done) => {
    httpServer = http.createServer().listen();
    ioServer = new socketio.Server(httpServer);
    httpServerAddr = httpServer.address() as AddressInfo;
    done();
  });

  afterAll((done) => {
    ioServer.close();
    httpServer.close();
    done();
  });

  const roomName = 'testRoom';
  const playerName = 'testPlayer';
  const playerState: PlayerT = {
    name: playerName,
    roomName,
    isAdmin: true,
    state: 'pending',
    pieces: [],
    board: emptyBoard,
  };

  beforeEach((done) => {
    controller.addClientToRoom({ roomName, playerName });

    const clientSocket = socketioClient(
      `http://[${httpServerAddr.address}]:${httpServerAddr.port}`
    );

    clientSocket.on('connect', () => {
      socket = clientSocket as unknown as socketio.Socket<
        ServerToClientEvents,
        ClientToServerEvents
      >;
      done();
    });
  });

  afterEach((done) => {
    controller.removeAllGames();
    if (socket.connected) {
      socket.disconnect();
    }
    done();
  });

  it('should update state in room and add pieces if pieces length is under 3', () => {
    const updatePlayerStateSpy = jest.spyOn(
      controller.getGame(roomName),
      'updatePlayerState'
    );
    const addPiecesToPlayersSpy = jest.spyOn(
      controller.getGame(roomName),
      'addPiecesToPlayers'
    );
    updateHandler({ io: ioServer, controller, socket })({
      roomName,
      playerState,
    });
    expect(updatePlayerStateSpy).toHaveBeenCalledWith(playerState);
    expect(addPiecesToPlayersSpy).toHaveBeenCalledWith(expect.toBeArray());
  });
  it('should throw error if game does not exist', () => {
    const socketEmitSpy = jest.spyOn(socket, 'emit');

    const nonExistingRoom = 'nonExistingRoom';
    updateHandler({ io: ioServer, controller, socket })({
      roomName: nonExistingRoom,
      playerState,
    });

    expect(socketEmitSpy).toHaveBeenCalledWith(outgoingEvents.ERROR, {
      error: new GameNotFoundError(nonExistingRoom),
    });
  });
  it('should throw error if player does not exist', () => {
    const socketEmitSpy = jest.spyOn(socket, 'emit');

    const notExisting = 'notExisting';
    updateHandler({ io: ioServer, controller, socket })({
      roomName,
      playerState: {
        ...playerState,
        name: notExisting,
      },
    });

    expect(socketEmitSpy).toHaveBeenCalledWith(outgoingEvents.ERROR, {
      error: new PlayerNotFoundError(`Could not update ${notExisting}`),
    });
  });
});
