import React from 'react'
import ReactDom from 'react-dom'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { storeStateMiddleWare } from './middleware/storeStateMiddleWare'
import reducer from './reducers'
import App from './containers/app'
import { alert } from './actions/alert'

const initialState = {}

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk, createLogger({
    level: 'info',
  }), storeStateMiddleWare),
)

const renderApp = () => ReactDom.render(
  <React.StrictMode>
    <Provider store={store}>
      <App message='test message'/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

renderApp()
store.dispatch(alert('Soon, will be here a fantastic Tetris ...'))

// renderApp()
// store.subscribe(renderApp)
