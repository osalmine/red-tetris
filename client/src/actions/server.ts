import * as incomingEvents from '../constants/incomingEvents';
import * as outgoingEvents from '../constants/outgoingEvents';
import { UpdateState } from '../reducers/types';
import { JoinRoomAction, StartGameAction, UpdateAction } from './types';

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

export const updateState = (state: UpdateState): UpdateAction => ({
  type: incomingEvents.UPDATE,
  state,
});

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
