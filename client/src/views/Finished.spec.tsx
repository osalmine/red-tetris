import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithProviders from 'test/utils/renderWithProviders';
import '@testing-library/jest-dom';
import { mockClientState, mockGameState, mockPlayer } from 'test/utils/mockStates';
import * as redux from 'react-redux';

import Finished from './Finished';
import * as outgoingEvents from '../constants/outgoingEvents';

jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
}));

describe('<Finished />', () => {
  it('renders without crashing and displays player name', () => {
    const roomName = 'room';
    const playerName = 'onni';
    const player = mockPlayer({
      name: playerName,
      roomName,
      state: 'finished',
    });
    const clientState = mockClientState({ roomName, playerName });
    const gameState = mockGameState({ roomState: 'finished' }, [player], [player]);
    renderWithProviders(<Finished />, {
      preloadedState: {
        player: clientState,
        state: gameState,
      },
    });

    expect(screen.getByText(`Game finished in room ${roomName}`)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(playerName))).toBeInTheDocument();
  });
  it('dispatches reset action when pressing Main menu', async () => {
    const roomName = 'room';
    const playerName = 'onni';
    const player = mockPlayer({
      name: playerName,
      roomName,
      state: 'finished',
    });
    const clientState = mockClientState({ roomName, playerName });
    const gameState = mockGameState({ roomState: 'finished' }, [player], [player]);

    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();

    useDispatchSpy.mockReturnValue(mockDispatchFn);

    renderWithProviders(<Finished />, {
      preloadedState: {
        player: clientState,
        state: gameState,
      },
    });

    await userEvent.click(screen.getByText('Main menu'));
    expect(mockDispatchFn).toHaveBeenCalledWith({
      type: outgoingEvents.RESET,
      roomName,
      initiator: playerName,
    });
  });
});
