import { JoinRoomAction } from '../actions/types';
import { ClientState } from './types';
import * as outgoingEvents from '../constants/outgoingEvents';

const joinRoomReducer = (state: ClientState = {}, action: JoinRoomAction): ClientState => {
  console.log('joinRoomReducer action:', action);
  switch (action.type) {
  case outgoingEvents.JOIN:
    return { playerName: action.playerName, roomName: action.roomName };
  default:
    return state;
  }
};

export default joinRoomReducer;
