import * as socketio from 'socket.io';
import debug from 'debug';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketClients,
} from '../types';
import Controller from '../models/controller';
import * as incomingEvents from '../constants/incomingEvents';
import joinHandler from '../handlers/joinHandler';
import startHandler from '../handlers/startHandler';
import updateHandler from '../handlers/updateHandler';
import disconnectHandler from '../handlers/dissconnectHandler';
import endHandler from '../handlers/endHandler';

const loginfo = debug('tetris:info');

const controller = new Controller();
const socketClients: SocketClients = new Map<
  string,
  { roomName: string; playerName: string }
>();

const onConnect =
  (io: socketio.Server<ClientToServerEvents, ServerToClientEvents>) =>
  (socket: socketio.Socket<ClientToServerEvents, ServerToClientEvents>) => {
    loginfo(`Socket connected: ${socket.id}`);

    socket.once(
      incomingEvents.JOIN,
      joinHandler({ io, socket, controller, socketClients })
    );

    socket.on(incomingEvents.START, startHandler({ io, controller }));

    socket.on(incomingEvents.UPDATE, updateHandler({ io, socket, controller }));

    socket.on(incomingEvents.END, endHandler({ io, socket, controller }));

    socket.on(
      'disconnect',
      disconnectHandler({ io, socket, controller, socketClients })
    );
  };

const initEngine = (
  io: socketio.Server<ClientToServerEvents, ServerToClientEvents>
) => {
  io.on('connection', onConnect(io));
};

export default initEngine;
