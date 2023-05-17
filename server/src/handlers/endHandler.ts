import * as socketio from 'socket.io';
import debug from 'debug';

import { ClientToServerEvents, ServerToClientEvents } from '../types';
import Controller from '../models/Controller';
import * as outgoingEvents from '../constants/outgoingEvents';
import { GameNotFoundError } from '../models/Error';

const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info');

const endHandler =
  ({
    io,
    socket,
    controller,
  }: {
    io: socketio.Server<ClientToServerEvents, ServerToClientEvents>;
    socket: socketio.Socket<ClientToServerEvents, ServerToClientEvents>;
    controller: Controller;
  }) =>
  ({ roomName, playerName }: { roomName: string; playerName: string }) => {
    loginfo(`End game emit received from room ${roomName} initiated by ${playerName}`);
    const game = controller.getGame(roomName);
    try {
      if (!game) {
        throw new GameNotFoundError(roomName);
      }
      const player = game.getPlayer(playerName);
      player.setState('finished');
      game.addPlayerToFinishedPlayers(player);
      if (game.isFinished) {
        game.setGameState('finished');
      }
      io.to(roomName).emit(outgoingEvents.UPDATE, game.state);
    } catch (error) {
      logerror(error);
      if (error instanceof GameNotFoundError) {
        socket.emit(outgoingEvents.ERROR, { error });
      } else {
        throw error;
      }
    }
  };

export default endHandler;
