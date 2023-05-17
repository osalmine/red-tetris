import { ClientEndGameAction, ServerResetGame, ServerUpdateAction } from '../actions/types';
import { GameState } from '../types';
import * as incomingEvents from '../constants/incomingEvents';
import * as outgoingEvents from '../constants/outgoingEvents';

type ServerAction = ServerUpdateAction | ServerResetGame | ClientEndGameAction;

const defaultState: GameState = {
  roomState: 'pending',
  players: [],
  finishedPlayers: [],
};

const updateStateReducer = (state: GameState = defaultState, action: ServerAction): GameState => {
  switch (action.type) {
    case incomingEvents.UPDATE: {
      const newState = { ...state, ...action.state };
      return newState;
    }
    case incomingEvents.RESET: {
      const newState = { ...state, ...action.state };
      return newState;
    }
    case outgoingEvents.END: {
      const newState = {
        ...state,
        players: state.players.map(player => {
          if (player.name === action.playerName) {
            return { ...player, state: 'finished' };
          }
          return player;
        }),
      } satisfies GameState;
      return newState;
    }
    default:
      return state;
  }
};

export default updateStateReducer;
