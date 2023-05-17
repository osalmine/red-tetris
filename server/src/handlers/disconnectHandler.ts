import * as socketio from 'socket.io';
import debug from 'debug';

import { ClientToServerEvents, ServerToClientEvents, SocketClients } from '../types';
import Controller from '../models/Controller';
import * as outgoingEvents from '../constants/outgoingEvents';
import { GameNotFoundError } from '../models/Error';

const loginfo = debug('tetris:info');
const logerror = debug('tetris:error');

const disconnectHandler =
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
  () => {
    loginfo(`Socket disconnected: ${socket.id}`);
    try {
      if (socketClients.has(socket.id)) {
        const { roomName, playerName } = socketClients.get(socket.id);
        const game = controller.getGame(roomName);
        if (!game) {
          throw new GameNotFoundError(roomName);
        }

        const wasAdmin = game.getPlayer(playerName).isAdmin;
        game.removePlayer(playerName);

        socketClients.delete(socket.id);

        if (game.hasPlayers) {
          if (wasAdmin) {
            game.firstPlayer.assignAdmin();
          }
          io.to(roomName).emit(outgoingEvents.UPDATE, game.state);
        } else {
          controller.removeGame(roomName);
        }
      }
    } catch (error) {
      logerror(error);
      if (error instanceof GameNotFoundError) {
        socket.emit(outgoingEvents.ERROR, { error });
      } else {
        throw error;
      }
    }
  };

export default disconnectHandler;
