import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { storeStateMiddleWare } from './middleware/storeStateMiddleWare'
import { alertReducer, pingReducer } from './reducers'

const initialState = {}

const reducer = combineReducers({
  alert: alertReducer,
  ping: pingReducer,
})

export const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk, createLogger({
    level: 'info',
  }), storeStateMiddleWare),
)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

