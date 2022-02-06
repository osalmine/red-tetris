import * as SocketIOClient from 'socket.io-client';
import { Store } from 'react-notifications-component';
import { Dispatch } from 'redux';

import pingServer from '../services/ping';
import { joinRoom, startGame } from '../services';
import * as incomingEvents from '../constants/incomingEvents';
import * as outgoingEvents from '../constants/outgoingEvents';
import { pongAction, updateState } from '../actions/server';
import { AllActions, JoinRoomAction, StartGameAction } from '../actions/types';
import { PlayerAlreadyExistsError, UpdateState } from '../types';

export const socketMiddleWare = (socket: SocketIOClient.Socket) => ({ dispatch }: {dispatch: Dispatch}) => {
  socket.on(incomingEvents.PONG, (message: string) => {
    console.log('receive PONG: ', message);
    dispatch(pongAction(message));
  });

  socket.on(incomingEvents.UPDATE, (data: UpdateState) => {
    console.log('receive UPDATE: ', data);
    dispatch(updateState(data));
  });

  socket.on(incomingEvents.ERROR, ({ error }: PlayerAlreadyExistsError) => {
    console.log('receive ERROR: ', error);
    Store.addNotification({
      title: 'Player already exists',
      message: `Player named ${error.data.playerName} has already joined the game`,
      container: 'top-right',
      type: 'danger',
      insert: 'top',
      dismiss: {
        duration: 4000,
        onScreen: true,
        pauseOnHover: true,
      },
    });
  });

  return (next: Dispatch<AllActions>) => (action: AllActions) => {
    console.log('socketMiddleWare: ', action);
    switch (action.type) {
    case outgoingEvents.PING:
      pingServer();
      return next(action);
    case outgoingEvents.JOIN: {
      console.log('JOIN action:', action);
      const { roomName, playerName } = action as JoinRoomAction;
      console.log(`roomName: ${roomName}, playername: ${playerName}`);
      joinRoom({ roomName, playerName });
      return next(action);
    }
    case outgoingEvents.START: {
      console.log('JOIN action:', action);
      const { roomName, initiator } = action as StartGameAction;
      console.log(`roomName: ${roomName}, initiator: ${initiator}`);
      startGame({ roomName, initiator });
      return next(action);
    }

    default:
      return next(action);
    }
  };
};
