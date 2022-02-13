import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// import { storeStateMiddleWare } from './middleware/storeStateMiddleWare'
import { alertReducer, clientReducer, pingReducer, pongReducer, updateStateReducer } from './reducers';
import { socketMiddleWare } from './middleware/socketMiddleWare';
import socket from './socket/socket';

const initialState = {};

const reducer = combineReducers({
  alert: alertReducer,
  ping: pingReducer,
  pong: pongReducer,
  state: updateStateReducer,
  client: clientReducer,
});

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

export const store = createStore(
  reducer,
  initialState,
  composeEnhancers(
    applyMiddleware(
      thunk,
      createLogger({
        level: 'info',
      }),

      // storeStateMiddleWare,
      socketMiddleWare(socket),
    ),
  ),
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

