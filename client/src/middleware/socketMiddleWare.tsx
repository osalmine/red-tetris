import * as SocketIOClient from 'socket.io-client'
import pingServer from '../services/ping';
import * as incomingEvents from '../constants/incomingEvents';
import * as outgoingEvents from '../constants/outgoingEvents';

import { pongAction } from '../actions/server';

export const socketMiddleWare = (socket: SocketIOClient.Socket) => (store: any) => {
  socket.on(incomingEvents.PONG, (message: string) => {
    console.log('receive PONG: ', message);
    store.dispatch(pongAction(message));
  })

  return (next: any) => (action: any) => {
    console.log('socketMiddleWare: ', action);
    if (action.type === outgoingEvents.PING) {
    // socket.emit('PING', action.payload);
      pingServer();
    }

    return next(action);
  }
}
