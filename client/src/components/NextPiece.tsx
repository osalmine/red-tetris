import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Board } from './Board';
import pieces, { PieceName } from '../constants/pieces';
import { Piece } from '../reducers/types';

type Props = {
  pieceCharacter: PieceName;
};

const PieceContainer = styled.div`
  display: flex;
`;

const getPieceOffset = (pieceCharacter: PieceName) => {
  switch (pieceCharacter) {
    case 'O':
    case 'J':
    case 'S':
    case 'T':
    case 'Z':
      return 1;
    case 'I':
    case 'L':
      return 0;
    default:
      return 0;
  }
};

const NextPiece = ({ pieceCharacter }: Props) => {
  const renderPiece: Piece = useMemo(
    () => ({
      values: pieces[pieceCharacter],
      pieceXOffset: getPieceOffset(pieceCharacter),
      pieceYOffset: pieceCharacter === 'O' ? 1 : 0,
      pieceType: pieceCharacter,
    }),
    [pieceCharacter]
  );

  return (
    <PieceContainer>
      <Board activePiece={renderPiece} cols={4} rows={4} width={12} />
    </PieceContainer>
  );
};

export default NextPiece;
