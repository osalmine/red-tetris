import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import ConnectPlayer from './ConnectPlayer';
import App from './App';
import GlobalStyle, { globalColorTheme } from './GlobalStyle';
import { store } from './store';
import { pieceMoveDownHandler } from './handlers/pieceMovement';

store.subscribe(pieceMoveDownHandler);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!);

root.render(
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
);
