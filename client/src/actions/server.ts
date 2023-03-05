import * as incomingEvents from '../constants/incomingEvents';
import * as outgoingEvents from '../constants/outgoingEvents';
import { GameState, Player } from '../reducers/types';
import { store } from '../store';
import {
  JoinRoomAction,
  StartGameAction,
  ServerUpdateAction,
  ClientUpdateAction,
  ClientEndGameAction,
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

export const clientUpdateState = (player: Player): ClientUpdateAction => {
  const {
    player: { roomName },
  } = store.getState();
  const action: ClientUpdateAction = {
    type: outgoingEvents.UPDATE,
    playerState: player,
    roomName: roomName || '',
  };
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

export const endGame = ({
  roomName,
  playerName,
}: {
  roomName: string;
  playerName: string;
}): ClientEndGameAction => ({
  type: outgoingEvents.END,
  roomName,
  playerName,
});
