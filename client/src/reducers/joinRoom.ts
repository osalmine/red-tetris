import { JoinRoomAction } from '../actions/types';
import { PlayerState } from './types';
import * as outgoingEvents from '../constants/outgoingEvents';

const joinRoomReducer = (state: PlayerState = {}, action: JoinRoomAction): PlayerState => {
  console.log('joinRoomReducer action:', action);
  switch (action.type) {
  case outgoingEvents.JOIN:
    return { playerName: action.playerName };
  default:
    return state;
  }
};

export default joinRoomReducer;
