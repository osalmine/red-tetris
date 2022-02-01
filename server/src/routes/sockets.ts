import * as socketio from 'socket.io';
import debug from 'debug';
import { ClientToServerEvents, ServerToClientEvents } from '../types';
import Controller from '../models/controller';
import * as incomingEvents from '../constants/incomingEvents';
import * as outgoingEvents from '../constants/outgoingEvents';
import Game from '../models/game';
import Player from '../models/player';
import params from '../../params';
import { addClientToRoom } from '../handler/joinRoom';

const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info');

const controller = new Controller();

const initEngine = (io: socketio.Server<ClientToServerEvents, ServerToClientEvents>) => {
  io.on('connection', (socket: socketio.Socket<ClientToServerEvents, ServerToClientEvents>) => {

    loginfo(`Socket connected: ${ socket.id}`);

    socket.on('action', (action) => {
      loginfo(`Socket action: ${ action.type}`);
      if (action.type === 'server/ping') {
        loginfo('Emit ping');
        socket.emit('server/pong', { message: 'pong' });
      }
    });

    socket.once(incomingEvents.JOIN, ({ roomName, playerName }) => {
      controller.addClientToRoom({ roomName, playerName });
      socket.join(roomName);
      io.to(roomName).emit(outgoingEvents.UPDATE, controller.getGame(roomName).state);
    });
  });
};

export default initEngine;
