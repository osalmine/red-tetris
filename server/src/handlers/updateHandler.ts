import * as socketio from 'socket.io';
import debug from 'debug';

import { ClientToServerEvents, PlayerT, ServerToClientEvents } from '../types';
import Controller from '../models/Controller';
import * as outgoingEvents from '../constants/outgoingEvents';
import { GameNotFoundError } from '../models/Error';

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
    loginfo(`ROOM ${roomName}: RECEIVE GAME STATE`, playerState);
    const game = controller.getGame(roomName);
    try {
      if (!game) {
        throw new GameNotFoundError(roomName);
      }
      game.updatePlayerState(playerState);
      const minimumAmountOfPieces = 3;
      if (playerState.pieces.length <= minimumAmountOfPieces) {
        game.addPiecesToPlayers(game.pieceHandler.generateBatch());
      }
      loginfo('New player state', game.getPlayer(playerState.name));
      io.to(roomName).emit(outgoingEvents.UPDATE, game.state);
    } catch (error) {
      if (error instanceof GameNotFoundError) {
        logerror(`GameNotFoundError catched: ${error}`);
        socket.emit(outgoingEvents.ERROR, { error });
      } else {
        logerror(error);
      }
    }
  };

export default updateHandler;
