import { PongAction } from '../actions/types'
import { PongState } from './types'
import * as incomingEvents from '../constants/incomingEvents';

const pongReducer = (state: PongState[] = [], action: PongAction) => {
  console.log('pongReducer action:', action);
  switch (action.type) {
  case incomingEvents.PONG:
    console.log('[...state, action.message]: ', [...state, action.message]);
    return [...state, action.message];
  default:
    return state
  }
}

export default pongReducer
