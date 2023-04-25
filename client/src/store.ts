import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import immutable from 'redux-immutable-state-invariant';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';

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

const middleware =
  // eslint-disable-next-line no-negated-condition
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test'
    ? [
        immutable(),
        thunk,
        createLogger({
          level: 'info',
        }),
        socketMiddleWare(socket),
      ]
    : [thunk, socketMiddleWare(socket)];

// eslint-disable-next-line no-use-before-define
export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer,
    middleware,
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
  });

export const store = setupStore(initialState);

export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
