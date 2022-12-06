import * as socketio from 'socket.io';
import debug from 'debug';

import { ClientToServerEvents, ServerToClientEvents } from '../types';
import Controller from '../models/controller';
import * as outgoingEvents from '../constants/outgoingEvents';

const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info');

const joinHandler =
  ({
    io,
    controller,
  }: {
    io: socketio.Server<ClientToServerEvents, ServerToClientEvents>;
    controller: Controller;
  }) =>
  ({ roomName, initiator }) => {
    loginfo(
      `Start game emit received from room ${roomName} initiated by ${initiator}`
    );
    const game = controller.getGame(roomName);
    if (game.getPlayer(initiator).isAdmin) {
      game.setGameToPlaying();
      game.addPiecesToPlayers(game.pieceHandler.generateBatch());
      io.to(roomName).emit(outgoingEvents.UPDATE, game.state);
    } else {
      logerror(`Can't start the game: ${initiator} is not admin`);
    }
  };

export default joinHandler;
