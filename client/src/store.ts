import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { storeStateMiddleWare } from './middleware/storeStateMiddleWare'
import alertReducer from './reducers'

const initialState = {}

export const store = createStore(
  alertReducer,
  initialState,
  applyMiddleware(thunk, createLogger({
    level: 'info',
  }), storeStateMiddleWare),
)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

