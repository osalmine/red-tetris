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
    loginfo(`Client is stored in socketClients: ${socketClients.has(socket.id)}`);
    try {
      if (socketClients.has(socket.id)) {
        const { roomName, playerName } = socketClients.get(socket.id);
        const game = controller.getGame(roomName);
        if (!game) {
          throw new GameNotFoundError(roomName);
        }
        loginfo(`Player ${playerName} exists: ${game.playerExists(playerName)}`);

        const wasAdmin = game.getPlayer(playerName).isAdmin;
        game.removePlayer(playerName);

        socketClients.delete(socket.id);

        if (game.hasPlayers) {
          loginfo(`Game still has ${game.players.length} players`);
          if (wasAdmin) {
            loginfo('Disconnected player was admin');
            loginfo(`Assigning admin to ${game.firstPlayer.name}`);
            game.firstPlayer.assignAdmin();
          }
          io.to(roomName).emit(outgoingEvents.UPDATE, game.state);
        } else {
          loginfo('Game does not have any more players');
          controller.removeGame(roomName);
        }
      }
    } catch (error) {
      logerror(error);
      if (error instanceof GameNotFoundError) {
        logerror(`GameNotFoundError catched: ${error}`);
        socket.emit(outgoingEvents.ERROR, { error });
      } else {
        throw error;
      }
    }
  };

export default disconnectHandler;
