import React from 'react';
import { screen } from '@testing-library/react';
import renderWithProviders from 'test/utils/renderWithProviders';

import NextPiece from './NextPiece';

describe('NextPiece component', () => {
  it('should render with pieceCharacter "O"', () => {
    renderWithProviders(<NextPiece pieceCharacter="O" />);
    expect(screen.getByTestId('next-piece-0-2')).toHaveStyle(
      'background-color: #313338'
    );
    expect(screen.getByTestId('next-piece-1-2')).toHaveStyle(
      'background-color: #FFFFFF'
    );
  });

  it('should render with pieceCharacter "I"', () => {
    renderWithProviders(<NextPiece pieceCharacter="I" />);
    expect(screen.getByTestId('next-piece-0-1')).toHaveStyle(
      'background-color: #313338'
    );
    expect(screen.getByTestId('next-piece-0-2')).toHaveStyle(
      'background-color: #FFFFFF'
    );
  });

  it('should render with pieceCharacter "J"', () => {
    renderWithProviders(<NextPiece pieceCharacter="J" />);
    expect(screen.getByTestId('next-piece-0-1')).toHaveStyle(
      'background-color: #313338'
    );
    expect(screen.getByTestId('next-piece-0-2')).toHaveStyle(
      'background-color: #FFFFFF'
    );
    expect(screen.getByTestId('next-piece-2-1')).toHaveStyle(
      'background-color: #FFFFFF'
    );
  });

  it('should render with pieceCharacter "L"', () => {
    renderWithProviders(<NextPiece pieceCharacter="L" />);
    expect(screen.getByTestId('next-piece-0-1')).toHaveStyle(
      'background-color: #FFFFFF'
    );
    expect(screen.getByTestId('next-piece-0-2')).toHaveStyle(
      'background-color: #313338'
    );
    expect(screen.getByTestId('next-piece-2-2')).toHaveStyle(
      'background-color: #FFFFFF'
    );
  });

  it('should render with pieceCharacter "S"', () => {
    renderWithProviders(<NextPiece pieceCharacter="S" />);
    expect(screen.getByTestId('next-piece-0-1')).toHaveStyle(
      'background-color: #FFFFFF'
    );
    expect(screen.getByTestId('next-piece-0-2')).toHaveStyle(
      'background-color: #313338'
    );
    expect(screen.getByTestId('next-piece-2-2')).toHaveStyle(
      'background-color: #FFFFFF'
    );
  });

  it('should render with pieceCharacter "T"', () => {
    renderWithProviders(<NextPiece pieceCharacter="T" />);
    expect(screen.getByTestId('next-piece-0-1')).toHaveStyle(
      'background-color: #313338'
    );
    expect(screen.getByTestId('next-piece-0-2')).toHaveStyle(
      'background-color: #FFFFFF'
    );
  });

  it('should render with pieceCharacter "Z"', () => {
    renderWithProviders(<NextPiece pieceCharacter="Z" />);
    expect(screen.getByTestId('next-piece-0-1')).toHaveStyle(
      'background-color: #313338'
    );
    expect(screen.getByTestId('next-piece-0-2')).toHaveStyle(
      'background-color: #FFFFFF'
    );
  });
});
