import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import ConnectPlayer from './connectPlayer';
import App from './containers/app';
import { store } from './store';

ReactDom.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ConnectPlayer>
          <App/>
        </ConnectPlayer>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
