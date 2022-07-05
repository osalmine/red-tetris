import {
  ClientUpdateAction,
  JoinRoomAction,
  StartGameAction,
} from '../actions/types';
import { ClientState } from './types';
import * as outgoingEvents from '../constants/outgoingEvents';

type ClientAction = JoinRoomAction | StartGameAction | ClientUpdateAction;

const clientReducer = (
  state: ClientState = {},
  action: ClientAction
): ClientState => {
  switch (action.type) {
    case outgoingEvents.JOIN: {
      const newState = {
        ...state,
        playerName: action.playerName,
        roomName: action.roomName,
        pieceIndex: 0,
      };
      return newState;
    }
    default:
      return state;
  }
};

export default clientReducer;
