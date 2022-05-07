import { PingAction } from '../actions/types';
import { PingState } from './types';
import * as outgoingEvents from '../constants/outgoingEvents';

const pingReducer = (state: PingState = { count: 0 }, action: PingAction) => {
  switch (action.type) {
    case outgoingEvents.PING:
      const newState = { count: state.count + 1 };
      return newState;
    default:
      return state;
  }
};

export default pingReducer;
