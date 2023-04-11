import React from 'react';
import { screen } from '@testing-library/react';
import renderWithProviders from 'test/utils/renderWithProviders';

import '@testing-library/jest-dom';
import Pending from './Pending';

describe('<Pending />', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Pending />);

    expect(screen.getByText('Tetris')).toBeInTheDocument();
  });
});
