import * as socketio from 'socket.io';
import debug from 'debug';

import { ClientToServerEvents, ServerToClientEvents } from '../types';
import Controller from '../models/controller';
import * as outgoingEvents from '../constants/outgoingEvents';
import { GameNotFoundError } from '../models/error';

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
      if (error instanceof GameNotFoundError) {
        logerror(`GameNotFoundError catched: ${error}`);
        socket.emit(outgoingEvents.ERROR, { error });
      } else {
        logerror(error);
      }
    }
  };

export default blockOpponentRowsHandler;
