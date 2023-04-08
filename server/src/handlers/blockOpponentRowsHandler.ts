import * as socketio from 'socket.io';
import debug from 'debug';

import { ClientToServerEvents, ServerToClientEvents } from '../types';
import Controller from '../models/Controller';
import * as outgoingEvents from '../constants/outgoingEvents';
import { GameNotFoundError } from '../models/Error';

const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info');

const blockOpponentRowsHandler =
  ({
    io,
    socket,
    controller,
  }: {
    io: socketio.Server<ClientToServerEvents, ServerToClientEvents>;
    socket: socketio.Socket<ClientToServerEvents, ServerToClientEvents>;
    controller: Controller;
  }) =>
  ({
    roomName,
    playerName,
    numberOfBlockRows,
  }: {
    roomName: string;
    playerName: string;
    numberOfBlockRows: number;
  }) => {
    loginfo(
      `ROOM ${roomName}: RECEIVE BLOCK OPPONENT ROWS FROM ${playerName} WITH ${numberOfBlockRows} ROWS BLOCKING`
    );
    const game = controller.getGame(roomName);
    try {
      if (!game) {
        throw new GameNotFoundError(roomName);
      }
      game.addBlockedRowsToOpponents(playerName, numberOfBlockRows);
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

export default blockOpponentRowsHandler;
