import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithProviders from 'test/utils/renderWithProviders';
import '@testing-library/jest-dom';
import {
  mockClientState,
  mockGameState,
  mockPlayer,
} from 'test/utils/mockStates';
import * as redux from 'react-redux';

import Pending from './Pending';
import * as outgoingEvents from '../constants/outgoingEvents';

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
    expect(screen.getByText(new RegExp(playerName))).toBeInTheDocument();
  });
  it('dispatches an action when pressing start', () => {
    const playerName = 'onni';
    const player = mockPlayer({ name: playerName });
    const clientState = mockClientState({ playerName });
    const gameState = mockGameState({}, [player]);

    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();

    useDispatchSpy.mockReturnValue(mockDispatchFn);

    renderWithProviders(<Pending />, {
      preloadedState: {
        player: clientState,
        state: gameState,
      },
    });

    userEvent.click(screen.getByText('Start'));
    expect(useDispatchSpy).toHaveBeenCalledWith({
      type: outgoingEvents.START,
      roomName: 'room1',
      initiator: playerName,
    });
  });
});
