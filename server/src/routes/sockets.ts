import * as socketio from 'socket.io';
import debug from 'debug';
import { ClientToServerEvents, ServerToClientEvents, SocketClients } from '../types';
import Controller from '../models/Controller';
import * as incomingEvents from '../constants/incomingEvents';
import joinHandler from '../handlers/joinHandler';
import startHandler from '../handlers/startHandler';
import updateHandler from '../handlers/updateHandler';
import disconnectHandler from '../handlers/disconnectHandler';
import endHandler from '../handlers/endHandler';
import resetRoomHandler from '../handlers/resetRoomHandler';
import blockOpponentRowsHandler from '../handlers/blockOpponentRowsHandler';

const loginfo = debug('tetris:info');

export const controller = new Controller();
export const socketClients: SocketClients = new Map<
  string,
  { roomName: string; playerName: string }
>();

const onConnect =
  (io: socketio.Server<ClientToServerEvents, ServerToClientEvents>) =>
  (socket: socketio.Socket<ClientToServerEvents, ServerToClientEvents>) => {
    loginfo(`Socket connected: ${socket.id}`);

    socket.once(incomingEvents.JOIN, joinHandler({ io, socket, controller, socketClients }));

    socket.on(incomingEvents.START, startHandler({ io, controller }));

    socket.on(incomingEvents.UPDATE, updateHandler({ io, socket, controller }));

    socket.on(incomingEvents.END, endHandler({ io, socket, controller }));

    socket.on(incomingEvents.RESET, resetRoomHandler({ io, socket, controller }));

    socket.on(incomingEvents.BLOCK, blockOpponentRowsHandler({ io, socket, controller }));

    socket.on('disconnect', disconnectHandler({ io, socket, controller, socketClients }));
  };

const initEngine = (io: socketio.Server<ClientToServerEvents, ServerToClientEvents>) => {
  io.on('connection', onConnect(io));
};

export default initEngine;
