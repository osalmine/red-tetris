import * as SocketIOClient from 'socket.io-client';
import pingServer from '../services/ping';
import { joinRoom } from '../services';
import * as incomingEvents from '../constants/incomingEvents';
import * as outgoingEvents from '../constants/outgoingEvents';
import { pongAction, updateState } from '../actions/server';
import { Dispatch } from 'redux';
import { AllActions, JoinRoomAction } from '../actions/types';
import { UpdateState } from '../types';

export const socketMiddleWare = (socket: SocketIOClient.Socket) => ({ dispatch }: {dispatch: Dispatch}) => {
  socket.on(incomingEvents.PONG, (message: string) => {
    console.log('receive PONG: ', message);
    dispatch(pongAction(message));
  });

  socket.on(incomingEvents.UPDATE, (data: UpdateState) => {
    console.log('receive UPDATE: ', data);
    dispatch(updateState(data));
  });

  return (next: Dispatch<AllActions>) => (action: AllActions) => {
    console.log('socketMiddleWare: ', action);
    switch (action.type) {
    case outgoingEvents.PING:
      pingServer();
      return next(action);
    case outgoingEvents.JOIN:
      console.log('JOIN action:', action);
      const { roomName, playerName } = action as JoinRoomAction;
      console.log(`roomName: ${roomName}, playername: ${playerName}`);
      joinRoom({ roomName, playerName });
      return next(action);
    default:
      return next(action);
    }
  };
};
