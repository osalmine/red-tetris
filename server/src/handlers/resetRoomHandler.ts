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
      if (game.getPlayer(initiator).isAdmin) {
        controller.resetGame(roomName);
        io.to(roomName).emit(outgoingEvents.RESET, game.state);
      } else {
        logerror(`Can't reset the game: ${initiator} is not admin`);
      }
    } catch (error) {
      if (error instanceof GameNotFoundError) {
        logerror(`GameNotFoundError catched: ${error}`);
        socket.emit(outgoingEvents.ERROR, { error });
      } else if (error instanceof GameAlreadyStartedError) {
        logerror(`GameAlreadyStartedError catched: ${error}`);
        socket.emit(outgoingEvents.ERROR, { error });
      } else {
        logerror(error);
      }
    }
  };

export default resetRoomHandler;
