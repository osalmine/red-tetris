import React from 'react';
import { render, screen } from '@testing-library/react';

import NextPiece from './NextPiece';

describe('NextPiece component', () => {
  it('should render with pieceCharacter "O"', () => {
    render(<NextPiece pieceCharacter="O" />);
    expect(screen.getByTestId('next-piece-0-2')).toHaveStyle(
      'background-color: #313338'
    );
    expect(screen.getByTestId('next-piece-1-2')).toHaveStyle(
      'background-color: #FFFFFF'
    );
  });

  // it('should render with pieceCharacter "I"', () => {
  //   render(<NextPiece pieceCharacter="I" />);
  //   const cells = screen.getByTestId('next-piece-');
  //   expect(cells).toHaveLength(16);
  // });

  // it('should render with pieceCharacter "J"', () => {
  //   render(<NextPiece pieceCharacter="J" />);
  //   const cells = screen.getByTestId('next-piece-');
  //   expect(cells).toHaveLength(16);
  // });

  // it('should render with pieceCharacter "L"', () => {
  //   render(<NextPiece pieceCharacter="L" />);
  //   const cells = screen.getByTestId('next-piece-');
  //   expect(cells).toHaveLength(16);
  // });

  // it('should render with pieceCharacter "S"', () => {
  //   render(<NextPiece pieceCharacter="S" />);
  //   const cells = screen.getByTestId('next-piece-');
  //   expect(cells).toHaveLength(16);
  // });

  // it('should render with pieceCharacter "T"', () => {
  //   render(<NextPiece pieceCharacter="T" />);
  //   const cells = screen.getByTestId('next-piece-');
  //   expect(cells).toHaveLength(16);
  // });

  // it('should render with pieceCharacter "Z"', () => {
  //   render(<NextPiece pieceCharacter="Z" />);
  //   const cells = screen.getByTestId('next-piece-');
  //   expect(cells).toHaveLength(16);
  // });
});
