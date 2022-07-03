import * as incomingEvents from '../constants/incomingEvents';
import * as outgoingEvents from '../constants/outgoingEvents';
import { GameState } from '../reducers/types';
import { store } from '../store';
import {
  JoinRoomAction,
  StartGameAction,
  ServerUpdateAction,
  ClientUpdateAction,
} from './types';

export const joinRoom = ({
  roomName,
  playerName,
}: {
  roomName: string;
  playerName: string;
}): JoinRoomAction => ({
  type: outgoingEvents.JOIN,
  roomName,
  playerName,
});

export const serverUpdateState = (state: GameState): ServerUpdateAction => ({
  type: incomingEvents.UPDATE,
  state,
});

export const clientUpdateState = (
  state: Partial<GameState>
): ClientUpdateAction => {
  const { state: currentState } = store.getState();
  const action = {
    // type: outgoingEvents.UPDATE,
    type: 'clientUpdateState' as const,
    state: {
      ...currentState,
      ...state,
    },
  };
  console.log('ACTION', action);
  return action;
};

export const startGame = ({
  roomName,
  playerName,
}: {
  roomName: string;
  playerName: string;
}): StartGameAction => ({
  type: outgoingEvents.START,
  roomName,
  initiator: playerName,
});
