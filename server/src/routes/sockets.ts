import * as socketio from 'socket.io';
import debug from 'debug';
import { ClientToServerEvents, ServerToClientEvents } from '../types';
import Controller from '../models/controller';
import * as incomingEvents from '../constants/incomingEvents';
import Game from '../models/game';
import Player from '../models/player';
import params from '../../params';
import onRoomJoin from '../service/joinRoom';

const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info');

const controller = new Controller();

const initEngine = (io: socketio.Server<ServerToClientEvents, ClientToServerEvents>) => {
  io.on('connection', (socket: socketio.Socket<ClientToServerEvents, ServerToClientEvents>) => {

    loginfo(`Socket connected: ${ socket.id}`);

    socket.on('action', (action) => {
      // console.log('ACTION', action)
      loginfo(`Socket action: ${ action.type}`);
      if (action.type === 'server/ping') {
        loginfo('Emit ping');
        socket.emit('server/pong', { message: 'pong' });
      }
    });

    socket.once(incomingEvents.JOIN, ({ roomName, playerName }) => {
      onRoomJoin({ controller, roomName, playerName });
    });
  });
};

export default initEngine;
