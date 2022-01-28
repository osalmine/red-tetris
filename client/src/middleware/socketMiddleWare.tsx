import * as SocketIOClient from 'socket.io-client'
import pingServer from '../services/ping';
import * as incomingEvents from '../constants/incomingEvents';
import * as outgoingEvents from '../constants/outgoingEvents';
import { pongAction } from '../actions/server';
import { Dispatch } from 'redux';
import { AllActions } from '../actions/types';

export const socketMiddleWare = (socket: SocketIOClient.Socket) => ({ dispatch }: {dispatch: Dispatch}) => {
  socket.on(incomingEvents.PONG, (message: string) => {
    console.log('receive PONG: ', message);
    dispatch(pongAction(message));
  })

  return (next: Dispatch<AllActions>) => (action: AllActions) => {
    console.log('socketMiddleWare: ', action);
    if (action.type === outgoingEvents.PING) {
      pingServer();
    }

    return next(action);
  }
}