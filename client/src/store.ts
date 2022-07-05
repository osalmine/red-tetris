import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import immutable from 'redux-immutable-state-invariant';

import {
  clientReducer,
  pieceMovementReducer,
  updateStateReducer,
} from './reducers';
import { socketMiddleWare } from './middleware/socketMiddleWare';
import socket from './socket/socket';

const initialState = {};

const reducer = combineReducers({
  state: updateStateReducer,
  player: clientReducer,
  piece: pieceMovementReducer,
});

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

const middleware =
  // eslint-disable-next-line no-negated-condition
  process.env.NODE_ENV !== 'production'
    ? [
        immutable(),
        thunk,
        createLogger({
          level: 'info',
        }),
        socketMiddleWare(socket),
      ]
    : [
        thunk,
        createLogger({
          level: 'info',
        }),
        socketMiddleWare(socket),
      ];

export const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
