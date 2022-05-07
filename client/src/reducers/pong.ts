import { PongAction } from '../actions/types';
import { PongState } from './types';
import * as incomingEvents from '../constants/incomingEvents';

const pongReducer = (
  state: PongState[] = [],
  action: PongAction
): PongState[] => {
  switch (action.type) {
    case incomingEvents.PONG:
      const newState = [...state, action.message] as PongState[];
      return newState;
    default:
      return state;
  }
};

export default pongReducer;
