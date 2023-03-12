import { ServerUpdateAction } from '../actions/types';
import { GameState } from '../types';
import * as incomingEvents from '../constants/incomingEvents';

const defaultState: GameState = {
  roomState: 'pending',
  players: [],
  finishedPlayers: [],
};

const updateStateReducer = (
  state: GameState = defaultState,
  action: ServerUpdateAction
): GameState => {
  switch (action.type) {
    case incomingEvents.UPDATE:
      const newState = { ...state, ...action.state };
      return newState;
    default:
      return state;
  }
};

export default updateStateReducer;
