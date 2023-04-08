import * as socketio from 'socket.io';
import debug from 'debug';

import { ClientToServerEvents, ServerToClientEvents } from '../types';
import Controller from '../models/Controller';
import { GameAlreadyStartedError, GameNotFoundError } from '../models/Error';
import * as outgoingEvents from '../constants/outgoingEvents';

const logerror = debug('tetris:error');
const loginfo = debug('tetris:info');

const resetRoomHandler =
  ({
    io,
    socket,
    controller,
  }: {
    io: socketio.Server<ClientToServerEvents, ServerToClientEvents>;
    socket: socketio.Socket<ClientToServerEvents, ServerToClientEvents>;
    controller: Controller;
  }) =>
  ({ roomName, initiator }: { roomName: string; initiator: string }) => {
    loginfo(
      `Reset room emit received from room ${roomName} initiated by ${initiator}`
    );
    try {
      if (controller.isGameOngoing(roomName)) {
        logerror('Game already started');
        throw new GameAlreadyStartedError(roomName);
      }
      const game = controller.getGame(roomName);
      if (!game) {
        throw new GameNotFoundError(roomName);
      }
      if (game.getPlayer(initiator).isAdmin) {
        controller.resetGame(roomName);
        io.to(roomName).emit(outgoingEvents.RESET, game.state);
      } else {
        logerror(`Can't reset the game: ${initiator} is not admin`);
      }
    } catch (error) {
      logerror(error);
      if (error instanceof GameNotFoundError) {
        socket.emit(outgoingEvents.ERROR, { error });
      } else if (error instanceof GameAlreadyStartedError) {
        socket.emit(outgoingEvents.ERROR, { error });
      } else {
        throw error;
      }
    }
  };

export default resetRoomHandler;
