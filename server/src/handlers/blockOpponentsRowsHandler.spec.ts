import http from 'http';
import * as socketio from 'socket.io';
import Controller from '../models/Controller';
import { ClientToServerEvents, ServerToClientEvents } from '../types';
import blockOpponentRowsHandler from './blockOpponentRowsHandler';
import socketioClient from 'socket.io-client';
import { AddressInfo } from 'net';
import * as outgoingEvents from '../constants/outgoingEvents';

describe('blockOpponentRowsHandler', () => {
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

  beforeEach(() => {
    controller.addClientToRoom({ roomName, playerName });

    socket = socketioClient(
      `http://[${httpServerAddr.address}]:${httpServerAddr.port}`
    ) as unknown as socketio.Socket<ServerToClientEvents, ClientToServerEvents>;

    // socket = io(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`);
    // socket.on('connect', () => {
    //   done();
    // });
  });

  afterEach((done) => {
    controller.removeAllGames();
    if (socket.connected) {
      socket.disconnect();
    }
    done();
  });

  it('should block rows', () => {
    const addBlockedRowsToOpponentsSpy = jest.spyOn(
      controller.getGame(roomName),
      'addBlockedRowsToOpponents'
    );
    blockOpponentRowsHandler({ io: ioServer, controller, socket })({
      roomName,
      playerName,
      numberOfBlockRows: 1,
    });
    expect(addBlockedRowsToOpponentsSpy).toHaveBeenCalledWith(playerName, 1);
  });
  it('should throw error if game does not exist', (done) => {
    blockOpponentRowsHandler({ io: ioServer, controller, socket })({
      roomName: 'nonExistingRoom',
      playerName,
      numberOfBlockRows: 1,
    });
    socket.on(outgoingEvents.ERROR, (error) => {
      expect(error).toBe(`Game ${roomName} not found`);
      done();
    });
  });
});
