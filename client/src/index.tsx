import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'

import App from './containers/app'
import { alert } from './actions/alert'
import { store } from './store'

const renderApp = () => ReactDom.render(
  <React.StrictMode>
    <Provider store={store}>
      <App message='test message'/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

renderApp()
store.dispatch(alert('Tetris kohta...'))

// renderApp()
// store.subscribe(renderApp)
