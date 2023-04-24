import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ReactNotifications } from 'react-notifications-component';

import ConnectPlayer from './ConnectPlayer';
import App from './containers/App';
import GlobalStyle, { globalColorTheme } from './containers/GlobalStyle';
import { store } from './store';
import { pieceMoveDownHandler } from './handlers/pieceMovement';

store.subscribe(pieceMoveDownHandler);

ReactDom.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={globalColorTheme}>
          <GlobalStyle>
            <ConnectPlayer>
              <ReactNotifications />
              <App />
            </ConnectPlayer>
          </GlobalStyle>
        </ThemeProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
