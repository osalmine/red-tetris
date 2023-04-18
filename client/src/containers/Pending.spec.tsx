import React from 'react';
import { screen } from '@testing-library/react';
import renderWithProviders from 'test/utils/renderWithProviders';
import '@testing-library/jest-dom';
import {
  mockClientState,
  mockGameState,
  mockPlayer,
} from 'test/utils/mockStates';

import Pending from './Pending';

describe('<Pending />', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Pending />);

    expect(screen.getByText('Tetris')).toBeInTheDocument();
  });
  it('displays player name', () => {
    const playerName = 'onni';
    const player = mockPlayer({ name: playerName });
    const clientState = mockClientState({ playerName });
    const gameState = mockGameState({}, [player]);

    renderWithProviders(<Pending />, {
      preloadedState: {
        player: clientState,
        state: gameState,
      },
    });
    expect(screen.getByText(playerName, { exact: false })).toBeInTheDocument();
  });
});
