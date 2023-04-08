import * as socketio from 'socket.io';
import debug from 'debug';

import { ClientToServerEvents, PlayerT, ServerToClientEvents } from '../types';
import Controller from '../models/Controller';
import * as outgoingEvents from '../constants/outgoingEvents';
import { GameNotFoundError, PlayerNotFoundError } from '../models/Error';

const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info');

const updateHandler =
  ({
    io,
    socket,
    controller,
  }: {
    io: socketio.Server<ClientToServerEvents, ServerToClientEvents>;
    socket: socketio.Socket<ClientToServerEvents, ServerToClientEvents>;
    controller: Controller;
  }) =>
  ({ roomName, playerState }: { roomName: string; playerState: PlayerT }) => {
    loginfo(`ROOM ${roomName}: RECEIVE GAME STATE`);
    try {
      const game = controller.getGame(roomName);
      if (!game) {
        throw new GameNotFoundError(roomName);
      }
      game.updatePlayerState(playerState);
      const minimumAmountOfPieces = 3;
      if (playerState.pieces.length <= minimumAmountOfPieces) {
        game.addPiecesToPlayers(game.pieceHandler.generateBatch());
      }

      io.to(roomName).emit(outgoingEvents.UPDATE, game.state);
    } catch (error) {
      logerror(error);
      if (error instanceof GameNotFoundError) {
        socket.emit(outgoingEvents.ERROR, { error });
      } else if (error instanceof PlayerNotFoundError) {
        socket.emit(outgoingEvents.ERROR, { error });
      } else {
        throw error;
      }
    }
  };

export default updateHandler;
