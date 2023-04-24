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
    const player = mockPlayer({ name: playerName, state: 'playing' });
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
  it('renders game ended if game is finished', () => {
    const playerName = 'onni';
    const player = mockPlayer({ name: playerName, state: 'finished' });
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
    expect(screen.getByText('Game Ended')).toBeInTheDocument();
  });
  it('renders opponent boards', () => {
    const player1Name = 'onni';
    const player1 = mockPlayer({ name: player1Name, state: 'playing' });
    const clientState = mockClientState({ playerName: player1Name });
    const player2Name = 'jussi';
    const player2 = mockPlayer({ name: player2Name, state: 'playing' });
    const gameState = mockGameState({ roomState: 'playing' }, [
      player1,
      player2,
    ]);
    const pieceState = mockPieceState();

    renderWithProviders(<Game />, {
      preloadedState: {
        player: clientState,
        state: gameState,
        piece: pieceState,
      },
    });
    expect(screen.getByText(player2Name)).toBeInTheDocument();
    expect(screen.getByTestId('shadow-board-0-0')).toBeInTheDocument();
    expect(screen.getByTestId('shadow-board-19-9')).toBeInTheDocument();
  });
  it('renders opponent game over', () => {
    const player1Name = 'onni';
    const player1 = mockPlayer({ name: player1Name, state: 'playing' });
    const clientState = mockClientState({ playerName: player1Name });
    const player2Name = 'jussi';
    const player2 = mockPlayer({ name: player2Name, state: 'finished' });
    const gameState = mockGameState({ roomState: 'playing' }, [
      player1,
      player2,
    ]);
    const pieceState = mockPieceState();

    renderWithProviders(<Game />, {
      preloadedState: {
        player: clientState,
        state: gameState,
        piece: pieceState,
      },
    });
    expect(screen.getByText('Game Over')).toBeInTheDocument();
    expect(screen.getByTestId('shadow-board-0-0')).toBeInTheDocument();
    expect(screen.getByTestId('shadow-board-19-9')).toBeInTheDocument();
  });
});
