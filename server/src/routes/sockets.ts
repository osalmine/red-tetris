import * as socketio from 'socket.io';
import debug from 'debug';
import { ClientToServerEvents, ServerToClientEvents } from '../types';
import Controller from '../models/controller';
import * as incomingEvents from '../constants/incomingEvents';
import * as outgoingEvents from '../constants/outgoingEvents';
import Game from '../models/game';
import Player from '../models/player';
import params from '../../params';
import {
  GameAlreadyStartedError,
  PlayerAlreadyExistsError,
} from '../models/error';
import Piece from '../models/piece';

const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info');

const controller = new Controller();
const socketClients = new Map<
  string,
  { roomName: string; playerName: string }
>();

const initEngine = (
  io: socketio.Server<ClientToServerEvents, ServerToClientEvents>
) => {
  io.on(
    'connection',
    (socket: socketio.Socket<ClientToServerEvents, ServerToClientEvents>) => {
      loginfo(`Socket connected: ${socket.id}`);

      socket.on('action', (action) => {
        loginfo(`Socket action: ${action.type}`);
        if (action.type === 'server/ping') {
          loginfo('Emit ping');
          socket.emit('server/pong', { message: 'pong' });
        }
      });

      socket.once(incomingEvents.JOIN, ({ roomName, playerName }) => {
        try {
          if (controller.gameAlreadyStarted(roomName)) {
            logerror('Game already started');
            throw new GameAlreadyStartedError(roomName);
          }

          controller.addClientToRoom({ roomName, playerName });
          socketClients.set(socket.id, { roomName, playerName });
          socket.join(roomName);
          loginfo(
            `Emit to ${roomName}: ${
              outgoingEvents.UPDATE
            } state: ${JSON.stringify(controller.getGame(roomName).state)}`
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
      });

      socket.on(incomingEvents.START, ({ roomName, initiator }) => {
        loginfo(
          `Start game emit received from room ${roomName} initiated by ${initiator}`
        );
        const game = controller.getGame(roomName);
        if (game.getPlayer(initiator).isAdmin) {
          game.setGameToPlaying();
          game.addPiecesToPlayers(game.pieceHandler.generateBatch());
          io.to(roomName).emit(
            outgoingEvents.UPDATE,
            controller.getGame(roomName).state
          );
        } else {
          logerror(`Can't start the game: ${initiator} is not admin`);
        }
      });

      socket.on('disconnect', () => {
        loginfo(`Socket disconnected: ${socket.id}`);
        loginfo(
          `Client is stored in socketClients: ${socketClients.has(socket.id)}`
        );
        if (socketClients.has(socket.id)) {
          const { roomName, playerName } = socketClients.get(socket.id);
          const game = controller.getGame(roomName);
          loginfo(
            `Player ${playerName} exists: ${game.playerExists(playerName)}`
          );
          const wasAdmin = game.getPlayer(playerName).isAdmin;
          game.removePlayer(playerName);
          loginfo(
            `After remove player ${playerName} exists: ${game.playerExists(
              playerName
            )}`
          );
          socketClients.delete(socket.id);
          loginfo(
            `Emit after delete to ${roomName}: ${
              outgoingEvents.UPDATE
            } state: ${JSON.stringify(game.state)}`
          );
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
      });
    }
  );
};

export default initEngine;
