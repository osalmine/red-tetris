import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ConnectPlayer from './connectPlayer';
import App from './containers/App';
import GlobalStyle, { theme } from './containers/GlobalStyle';
import { store } from './store';

ReactDom.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ConnectPlayer>
          <ThemeProvider theme={theme}>
            <GlobalStyle>
              <App/>
            </GlobalStyle>
          </ThemeProvider>
        </ConnectPlayer>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
