import { AddNewActivePieceAction, JoinRoomAction } from '../actions/types';
import { ClientState } from './types';
import * as outgoingEvents from '../constants/outgoingEvents';
import * as internalEvents from '../constants/internalEvents';

const joinRoomReducer = (state: ClientState = {}, action: JoinRoomAction | AddNewActivePieceAction): ClientState => {
  console.log('joinRoomReducer action:', action);
  switch (action.type) {
  case outgoingEvents.JOIN: {
    const newState = { ...state, playerName: action.playerName, roomName: action.roomName };
    return newState;
  }
  case internalEvents.ACTIVE_PIECE: {
    const newState = { ...state, piece: {
      activePiece: action.activePiece,
      pieceXOffset: action.pieceXOffset,
      pieceYOffset: action.pieceYOffset,
    } };
    return newState;
  }
  default:
    return state;
  }
};

export default joinRoomReducer;
