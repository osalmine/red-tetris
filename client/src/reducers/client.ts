import { AddNewActivePieceAction, JoinRoomAction, MovePieceDownAction } from '../actions/types';
import { ClientState } from './types';
import * as outgoingEvents from '../constants/outgoingEvents';
import * as internalEvents from '../constants/internalEvents';

type ClientAction = JoinRoomAction | AddNewActivePieceAction | MovePieceDownAction;

const joinRoomReducer = (state: ClientState = {}, action: ClientAction): ClientState => {
  console.log('joinRoomReducer action:', action);
  switch (action.type) {
  case outgoingEvents.JOIN: {
    const newState = { ...state, playerName: action.playerName, roomName: action.roomName };
    return newState;
  }
  case internalEvents.ACTIVE_PIECE: {
    const newState = { ...state, activePiece: {
      values: action.activePiece,
      pieceXOffset: action.pieceXOffset,
      pieceYOffset: action.pieceYOffset,
    } };
    return newState;
  }
  case internalEvents.MOVE_DOWN: {
    if (state.activePiece) {
      const newState = { ...state, activePiece: {
        ...state.activePiece,
        pieceYOffset: state.activePiece.pieceYOffset + 1,
      } };
      return newState;
    }
    return state;
  }
  default:
    return state;
  }
};

export default joinRoomReducer;
