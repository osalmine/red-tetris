import { ServerResetGame, ServerUpdateAction } from '../actions/types';
import { GameState } from '../types';
import * as incomingEvents from '../constants/incomingEvents';

type ServerAction = ServerUpdateAction | ServerResetGame;

const defaultState: GameState = {
  roomState: 'pending',
  players: [],
  finishedPlayers: [],
};

const updateStateReducer = (
  state: GameState = defaultState,
  action: ServerAction
): GameState => {
  switch (action.type) {
    case incomingEvents.UPDATE: {
      const newState = { ...state, ...action.state };
      return newState;
    }
    case incomingEvents.RESET: {
      const newState = { ...state, ...action.state };
      return newState;
    }
    default:
      return state;
  }
};

export default updateStateReducer;
