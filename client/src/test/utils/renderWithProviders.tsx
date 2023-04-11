import React from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ReactNotifications } from 'react-notifications-component';

import { globalColorTheme } from '../../containers/GlobalStyle';
import GlobalStyle from '../../containers/GlobalStyle';
import { AppStore, RootState, setupStore } from '../../store';

type ExtendedRenderOptions = Omit<RenderOptions, 'queries'> & {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
};

const PageWrapper =
  (store: AppStore) =>
  ({ children }: { children: React.ReactNode }) =>
    (
      <Provider store={store}>
        <ThemeProvider theme={globalColorTheme}>
          <GlobalStyle>
            <ReactNotifications />
            {children}
          </GlobalStyle>
        </ThemeProvider>
      </Provider>
    );

const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => ({
  store,
  // eslint-disable-next-line new-cap
  ...render(ui, { wrapper: PageWrapper(store), ...renderOptions }),
});

export default renderWithProviders;
