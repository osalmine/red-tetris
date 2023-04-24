import React from 'react';
import { screen } from '@testing-library/react';
import renderWithProviders from 'test/utils/renderWithProviders';
import '@testing-library/jest-dom';
import {
  mockClientState,
  mockGameState,
  mockPieceState,
  mockPlayer,
} from 'test/utils/mockStates';

import Game from './Game';

describe('<Game />', () => {
  it('renders without crashing if there is no state', () => {
    renderWithProviders(<Game />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  it('renders board and next pieces', () => {
    const playerName = 'onni';
    const player = mockPlayer({ name: playerName });
    const clientState = mockClientState({ playerName });
    const gameState = mockGameState({ roomState: 'playing' }, [player]);
    const pieceState = mockPieceState();

    renderWithProviders(<Game />, {
      preloadedState: {
        player: clientState,
        state: gameState,
        piece: pieceState,
      },
    });
    expect(screen.getByText('Next pieces:')).toBeInTheDocument();
    expect(screen.getByTestId('0-0')).toBeInTheDocument();
    expect(screen.getByTestId('19-9')).toBeInTheDocument();
  });
});
