import * as socketio from 'socket.io';
import debug from 'debug';

import { ClientToServerEvents, ServerToClientEvents, SocketClients } from '../types';
import Controller from '../models/Controller';
import { GameAlreadyStartedError, PlayerAlreadyExistsError } from '../models/Error';
import * as outgoingEvents from '../constants/outgoingEvents';

const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info');

const joinHandler =
  ({
    io,
    socket,
    controller,
    socketClients,
  }: {
    io: socketio.Server<ClientToServerEvents, ServerToClientEvents>;
    socket: socketio.Socket<ClientToServerEvents, ServerToClientEvents>;
    controller: Controller;
    socketClients: SocketClients;
  }) =>
  ({ roomName, playerName }: { roomName: string; playerName: string }) => {
    loginfo(`${roomName}: player ${playerName} tries to join`);
    try {
      if (controller.isGameOngoing(roomName)) {
        logerror('Game already started');
        throw new GameAlreadyStartedError(roomName);
      }

      controller.addClientToRoom({ roomName, playerName });
      socketClients.set(socket.id, { roomName, playerName });
      socket.join(roomName);

      io.to(roomName).emit(outgoingEvents.UPDATE, controller.getGame(roomName).state);
    } catch (error) {
      logerror(error);
      if (error instanceof PlayerAlreadyExistsError) {
        socket.emit(outgoingEvents.ERROR, { error });
      } else if (error instanceof GameAlreadyStartedError) {
        socket.emit(outgoingEvents.ERROR, { error });
      } else {
        throw error;
      }
    }
  };

export default joinHandler;
