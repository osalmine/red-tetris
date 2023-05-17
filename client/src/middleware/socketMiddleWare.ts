import * as SocketIOClient from 'socket.io-client';
import { Dispatch } from 'redux';

import {
  joinRoom,
  startGame,
  endGame,
  updateState,
  resetGame,
  blockOpponentRows,
} from '../services';
import * as incomingEvents from '../constants/incomingEvents';
import * as outgoingEvents from '../constants/outgoingEvents';
import { serverResetGame, serverUpdateState } from '../actions/server';
import { AllActions } from '../actions/types';
import { GameState } from '../types';
import handleError from '../handlers/errorHandler';
import { Errors } from '../types';
import { store } from '../store';
import { addNewActivePiece } from '../actions/client';

export const socketMiddleWare =
  (socket: SocketIOClient.Socket) =>
  ({ dispatch }: { dispatch: Dispatch }) => {
    socket.on(incomingEvents.UPDATE, (data: GameState) => {
      dispatch(serverUpdateState(data));
      const { activePiece, nextPieceType } = store.getState().piece;
      if (!activePiece && nextPieceType) {
        dispatch(addNewActivePiece(nextPieceType));
      }
    });

    socket.on(incomingEvents.ERROR, (error: Errors) => {
      handleError(error);
    });

    socket.on(incomingEvents.RESET, (data: GameState) => {
      dispatch(serverResetGame(data));
    });

    return (next: Dispatch<AllActions>) => (action: AllActions) => {
      switch (action.type) {
        case outgoingEvents.JOIN: {
          const { roomName, playerName } = action;

          joinRoom({ roomName, playerName });
          return next(action);
        }
        case outgoingEvents.START: {
          const { roomName, initiator } = action;

          startGame({ roomName, initiator });
          return next(action);
        }
        case outgoingEvents.UPDATE: {
          const { playerState, roomName } = action;

          updateState({ playerState, roomName });
          return next(action);
        }
        case outgoingEvents.END: {
          const { playerName, roomName } = action;

          endGame({ roomName, playerName });
          return next(action);
        }
        case outgoingEvents.RESET: {
          const { initiator, roomName } = action;

          resetGame({ roomName, initiator });
          return next(action);
        }
        case outgoingEvents.BLOCK: {
          const { playerName, roomName, numberOfBlockRows } = action;

          blockOpponentRows({ roomName, playerName, numberOfBlockRows });
          return next(action);
        }

        default:
          return next(action);
      }
    };
  };
