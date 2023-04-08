import http from 'http';
import * as socketio from 'socket.io';
import Controller from '../models/Controller';
import { ClientToServerEvents, ServerToClientEvents } from '../types';
import endHandler from './endHandler';
import socketioClient from 'socket.io-client';
import { AddressInfo } from 'net';
import * as outgoingEvents from '../constants/outgoingEvents';
import { GameNotFoundError } from '../models/Error';

describe('endHandler', () => {
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

  it('should end a game if all players are finished', () => {
    const game = controller.getGame(roomName);
    const addPlayerToFinishedPlayersSpy = jest.spyOn(
      game,
      'addPlayerToFinishedPlayers'
    );
    const player = game.getPlayer(playerName);
    const setStateSpy = jest.spyOn(player, 'setState');
    const setGameStateSpy = jest.spyOn(game, 'setGameState');
    endHandler({ io: ioServer, controller, socket })({
      roomName,
      playerName,
    });
    expect(setStateSpy).toHaveBeenCalledWith('finished');
    expect(addPlayerToFinishedPlayersSpy).toHaveBeenCalledWith(player);
    expect(setGameStateSpy).toHaveBeenCalledWith('finished');
  });
  it('should set a player finished but not the room if at least one player is not finished', () => {
    const player2Name = 'testPlayer2';
    const player3Name = 'testPlayer3';
    controller.addClientToRoom({ roomName, playerName: player2Name });
    controller.addClientToRoom({ roomName, playerName: player3Name });
    const game = controller.getGame(roomName);
    const addPlayerToFinishedPlayersSpy = jest.spyOn(
      game,
      'addPlayerToFinishedPlayers'
    );
    const player1 = game.getPlayer(playerName);
    const player1SetStateSpy = jest.spyOn(player1, 'setState');
    const player2 = game.getPlayer(playerName);
    const player2SetStateSpy = jest.spyOn(player2, 'setState');
    const setGameStateSpy = jest.spyOn(game, 'setGameState');
    endHandler({ io: ioServer, controller, socket })({
      roomName,
      playerName,
    });
    endHandler({ io: ioServer, controller, socket })({
      roomName,
      playerName: player2Name,
    });
    expect(player1SetStateSpy).toHaveBeenCalledWith('finished');
    expect(player2SetStateSpy).toHaveBeenCalledWith('finished');
    expect(addPlayerToFinishedPlayersSpy).toHaveBeenCalledWith(player1);
    expect(addPlayerToFinishedPlayersSpy).toHaveBeenCalledWith(player2);
    expect(setGameStateSpy).not.toHaveBeenCalledWith('finished');
  });
  it('should throw error if game does not exist', () => {
    const socketEmitSpy = jest.spyOn(socket, 'emit');

    const nonExistingRoom = 'nonExistingRoom';
    endHandler({ io: ioServer, controller, socket })({
      roomName: nonExistingRoom,
      playerName,
    });

    expect(socketEmitSpy).toHaveBeenCalledWith(outgoingEvents.ERROR, {
      error: new GameNotFoundError(nonExistingRoom),
    });
  });
});
