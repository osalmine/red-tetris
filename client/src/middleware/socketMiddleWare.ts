import * as SocketIOClient from 'socket.io-client';
import pingServer from '../services/ping';
import { joinRoom } from '../services';
import * as incomingEvents from '../constants/incomingEvents';
import * as outgoingEvents from '../constants/outgoingEvents';
import { pongAction } from '../actions/server';
import { Dispatch } from 'redux';
import { AllActions, JoinRoomAction } from '../actions/types';

type PlayerObject = {
  name: string;
  roomName: string;
  isAdmin: boolean;
  state: 'pending' | 'playing' | 'finished';
};

type UpdateState = {
  gameState: 'pending' | 'playing' | 'finished';
  players: PlayerObject[];
};

export const socketMiddleWare = (socket: SocketIOClient.Socket) => ({ dispatch }: {dispatch: Dispatch}) => {
  socket.on(incomingEvents.PONG, (message: string) => {
    console.log('receive PONG: ', message);
    dispatch(pongAction(message));
  });

  socket.on(incomingEvents.UPDATE, (data: UpdateState) => {
    console.log('receive UPDATE: ', data);
  });

  return (next: Dispatch<AllActions>) => (action: AllActions) => {
    console.log('socketMiddleWare: ', action);
    switch (action.type) {
    case outgoingEvents.PING:
      pingServer();
      break;
    case outgoingEvents.JOIN:
      console.log('JOIN action:', action);
      const { roomName, playerName } = action as JoinRoomAction;
      console.log(`roomName: ${roomName}, playername: ${playerName}`);
      joinRoom({ roomName, playerName });
      break;
    default:
      break;
    }

    return next(action);
  };
};
