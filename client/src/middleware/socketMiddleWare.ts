import * as SocketIOClient from 'socket.io-client';
import { Dispatch } from 'redux';

import { joinRoom, startGame } from '../services';
import * as incomingEvents from '../constants/incomingEvents';
import * as outgoingEvents from '../constants/outgoingEvents';
import { serverUpdateState } from '../actions/server';
import { AllActions } from '../actions/types';
import { GameState } from '../reducers/types';
import handleError from '../handlers/errorHandler';
import { Errors } from '../types';
import updateState from '../services/update';
import endGame from '../services/endGame';

export const socketMiddleWare =
  (socket: SocketIOClient.Socket) =>
  ({ dispatch }: { dispatch: Dispatch }) => {
    socket.on(incomingEvents.UPDATE, (data: GameState) => {
      dispatch(serverUpdateState(data));
    });

    socket.on(incomingEvents.ERROR, (error: Errors) => {
      handleError(error);
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

        default:
          return next(action);
      }
    };
  };
