import { UpdateAction } from '../actions/types';
import { UpdateState } from '../types';
import * as incomingEvents from '../constants/incomingEvents';

const defaultState: UpdateState = {
  gameState: 'pending',
  players: [],
};

const updateStateReducer = (state: UpdateState = defaultState, action: UpdateAction): UpdateState => {
  console.log('updateStateReducer action:', action);
  switch (action.type) {
  case incomingEvents.UPDATE:
    const newState = { ...state, ...action.state };
    console.log('newState', newState);
    return newState;
  default:
    return state;
  }
};

export default updateStateReducer;
