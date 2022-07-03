import {
  AddPieceIndexAction,
  ClientUpdateAction,
  JoinRoomAction,
  StartGameAction,
} from '../actions/types';
import { ClientState } from './types';
import * as outgoingEvents from '../constants/outgoingEvents';
import * as internalEvents from '../constants/internalEvents';

type ClientAction =
  | JoinRoomAction
  | StartGameAction
  | AddPieceIndexAction
  | ClientUpdateAction;

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
    case internalEvents.ADD_PIECE_INDEX: {
      const newState = {
        ...state,
        pieceIndex: (state.pieceIndex || 0) + 1,
      };
      return newState;
    }
    default:
      return state;
  }
};

export default clientReducer;
