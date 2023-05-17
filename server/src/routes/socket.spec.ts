import { io, Socket } from 'socket.io-client';
import http from 'http';
import * as socketio from 'socket.io';
import * as incomingEvents from '../constants/incomingEvents';
import * as outgoingEvents from '../constants/outgoingEvents';
import { AddressInfo } from 'net';
import initEngine, { controller, socketClients } from './sockets';
import { ClientToServerEvents, GameState, PlayerT, ServerToClientEvents } from '../types';
import { emptyBoard, piecesBatch } from 'test/utils';

describe('one socket functionality', () => {
  let socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  let httpServer: http.Server;
  let httpServerAddr: AddressInfo;
  let ioServer: socketio.Server<ClientToServerEvents, ServerToClientEvents>;

  beforeAll(done => {
    httpServer = http.createServer().listen();
    httpServerAddr = httpServer.address() as AddressInfo;
    ioServer = new socketio.Server(httpServer);
    initEngine(ioServer);
    done();
  });

  afterAll(done => {
    ioServer.close();
    httpServer.close();
    done();
  });

  beforeEach(done => {
    socket = io(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
      // multiplex: false,
      // reconnectionDelay: 0,
      // transports: ['websocket'],
    });
    socket.on('connect', () => {
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

  describe('sockets', () => {
    it('receives join and emits update', done => {
      const roomName = 'testRoom';
      const playerName = 'testPlayer';
      socket.emit(incomingEvents.JOIN, { roomName, playerName });
      socket.on(outgoingEvents.UPDATE, data => {
        expect(data.roomState).toBe('pending');
        done();
      });
    });
    it('should not act on join more than once', done => {
      socket.emit(incomingEvents.JOIN, {
        roomName: 'room1',
        playerName: 'player1',
      });

      socket.on(outgoingEvents.UPDATE, data => {
        expect(data.players.length).toBe(1);
      });
      socket.emit(incomingEvents.JOIN, {
        roomName: 'room2',
        playerName: 'player2',
      });

      socket.on(outgoingEvents.UPDATE, data => {
        expect(data.players.length).toBe(1);
        done();
      });
    });
    it('receives start and emits update', done => {
      let lastEventData: GameState;
      let eventCount = 0;
      socket.emit(incomingEvents.JOIN, {
        roomName: 'testRoom',
        playerName: 'testPlayer',
      });
      socket.emit(incomingEvents.START, {
        roomName: 'testRoom',
        initiator: 'testPlayer',
      });
      socket.on(outgoingEvents.UPDATE, data => {
        lastEventData = data;
        eventCount++;
      });
      setTimeout(() => {
        expect(eventCount).toBe(2);
        expect(lastEventData.roomState).toBe('playing');
        done();
      }, 1000);
    });
    it('receives update and emits update', done => {
      let lastEventData: GameState;
      let eventCount = 0;
      const playerState: PlayerT = {
        name: 'testPlayer',
        roomName: 'testRoom',
        isAdmin: true,
        state: 'playing',
        pieces: piecesBatch,
        board: emptyBoard,
      };
      socket.emit(incomingEvents.JOIN, {
        roomName: 'testRoom',
        playerName: 'testPlayer',
      });
      socket.emit(incomingEvents.START, {
        roomName: 'testRoom',
        initiator: 'testPlayer',
      });
      socket.emit(incomingEvents.UPDATE, {
        roomName: 'testRoom',
        playerState,
      });
      socket.on(outgoingEvents.UPDATE, data => {
        lastEventData = data;
        eventCount++;
      });
      setTimeout(() => {
        expect(eventCount).toBe(3);
        expect(lastEventData.players[0]).toEqual(playerState);
        done();
      }, 1000);
    });
    it('receives update and emits update with new pieces if needed', done => {
      let lastEventData: GameState;
      let eventCount = 0;
      const playerState: PlayerT = {
        name: 'testPlayer',
        roomName: 'testRoom',
        isAdmin: true,
        state: 'playing',
        pieces: [],
        board: emptyBoard,
      };
      socket.emit(incomingEvents.JOIN, {
        roomName: 'testRoom',
        playerName: 'testPlayer',
      });
      socket.emit(incomingEvents.START, {
        roomName: 'testRoom',
        initiator: 'testPlayer',
      });
      socket.emit(incomingEvents.UPDATE, {
        roomName: 'testRoom',
        playerState,
      });
      socket.on(outgoingEvents.UPDATE, data => {
        lastEventData = data;
        eventCount++;
      });
      setTimeout(() => {
        expect(eventCount).toBe(3);
        expect(lastEventData.players[0].pieces.length).toBe(7);
        done();
      }, 1000);
    });
    it('receives end and does not set game to finish if more than one player is not finished', done => {
      let lastEventData: GameState;
      let eventCount = 0;

      const socket2 = io(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`);
      socket.on(outgoingEvents.UPDATE, data => {
        lastEventData = data;
        eventCount++;
      });
      socket.emit(incomingEvents.JOIN, {
        roomName: 'testRoom',
        playerName: 'testPlayer',
      });
      setTimeout(() => {
        socket2.emit(incomingEvents.JOIN, {
          roomName: 'testRoom',
          playerName: 'testPlayer2',
        });
      }, 100);
      setTimeout(() => {
        socket.emit(incomingEvents.START, {
          roomName: 'testRoom',
          initiator: 'testPlayer',
        });
      }, 200);
      setTimeout(() => {
        socket.emit(incomingEvents.END, {
          roomName: 'testRoom',
          playerName: 'testPlayer',
        });
      }, 300);

      setTimeout(() => {
        socket2.disconnect();
        expect(eventCount).toBe(4);
        expect(lastEventData.roomState).toBe('playing');
        done();
      }, 1000);
    });
    it('receives end and sets game to finish if all players are finished', done => {
      let lastEventData: GameState;
      let eventCount = 0;

      const socket2 = io(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`);
      socket.on(outgoingEvents.UPDATE, data => {
        lastEventData = data;
        eventCount++;
      });
      socket.emit(incomingEvents.JOIN, {
        roomName: 'testRoom',
        playerName: 'testPlayer',
      });
      socket2.emit(incomingEvents.JOIN, {
        roomName: 'testRoom',
        playerName: 'testPlayer2',
      });
      socket.emit(incomingEvents.START, {
        roomName: 'testRoom',
        initiator: 'testPlayer',
      });
      socket.emit(incomingEvents.END, {
        roomName: 'testRoom',
        playerName: 'testPlayer',
      });
      socket2.emit(incomingEvents.END, {
        roomName: 'testRoom',
        playerName: 'testPlayer2',
      });

      setTimeout(() => {
        socket2.disconnect();
        expect(eventCount).toBe(5);
        expect(lastEventData.roomState).toBe('finished');
        done();
      }, 1000);
    });
    it('receives reset and resets the room', done => {
      const controllerSpy = jest.spyOn(controller, 'resetGame');
      socket.emit(incomingEvents.JOIN, {
        roomName: 'testRoom',
        playerName: 'testPlayer',
      });
      socket.emit(incomingEvents.START, {
        roomName: 'testRoom',
        initiator: 'testPlayer',
      });
      socket.emit(incomingEvents.END, {
        roomName: 'testRoom',
        playerName: 'testPlayer',
      });
      socket.emit(incomingEvents.RESET, {
        roomName: 'testRoom',
        initiator: 'testPlayer',
      });
      socket.on(outgoingEvents.RESET, data => {
        expect(data.roomState).toBe('pending');
        expect(controllerSpy).toHaveBeenCalledWith('testRoom');
        done();
      });
    });
    it('receives block and calls the correct method', done => {
      let lastEventData: GameState;
      let eventCount = 0;
      socket.emit(incomingEvents.JOIN, {
        roomName: 'testRoom',
        playerName: 'testPlayer',
      });
      let gameSpy: jest.SpyInstance;
      setTimeout(() => {
        gameSpy = jest.spyOn(controller.getGame('testRoom'), 'addBlockedRowsToOpponents');
      }, 100);
      setTimeout(() => {
        socket.emit(incomingEvents.START, {
          roomName: 'testRoom',
          initiator: 'testPlayer',
        });
      }, 200);
      setTimeout(() => {
        socket.emit(incomingEvents.BLOCK, {
          roomName: 'testRoom',
          playerName: 'testPlayer',
          numberOfBlockRows: 1,
        });
      }, 200);
      socket.on(outgoingEvents.UPDATE, data => {
        lastEventData = data;
        eventCount++;
      });
      setTimeout(() => {
        expect(eventCount).toBe(3);
        expect(lastEventData).toBeObject();
        expect(gameSpy).toHaveBeenCalledWith('testPlayer', 1);
        done();
      }, 1000);
    });
  });
});
