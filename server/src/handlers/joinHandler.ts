import * as socketio from 'socket.io';
import debug from 'debug';

import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketClients,
} from '../types';
import Controller from '../models/controller';
import {
  GameAlreadyStartedError,
  PlayerAlreadyExistsError,
} from '../models/error';
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
    try {
      if (controller.gameAlreadyStarted(roomName)) {
        logerror('Game already started');
        throw new GameAlreadyStartedError(roomName);
      }

      controller.addClientToRoom({ roomName, playerName });
      socketClients.set(socket.id, { roomName, playerName });
      socket.join(roomName);
      loginfo(
        `Emit to ${roomName}: ${outgoingEvents.UPDATE} state: ${JSON.stringify(
          controller.getGame(roomName).state
        )}`
      );

      io.to(roomName).emit(
        outgoingEvents.UPDATE,
        controller.getGame(roomName).state
      );
    } catch (error) {
      if (error instanceof PlayerAlreadyExistsError) {
        logerror(`PlayerAlreadyExistsError catched: ${error}`);
        socket.emit(outgoingEvents.ERROR, { error });
      }
      if (error instanceof GameAlreadyStartedError) {
        logerror(`GameAlreadyStartedError catched: ${error}`);
        socket.emit(outgoingEvents.ERROR, { error });
      } else {
        logerror(error);
      }
    }
  };

export default joinHandler;
