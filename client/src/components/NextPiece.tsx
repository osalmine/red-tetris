import React, { useMemo } from 'react';
import styled from 'styled-components';

import { PlayerBoard } from './PlayerBoard';
import pieces, { PieceName } from '../constants/pieces';
import { Piece } from '../types';

type Props = {
  pieceCharacter: PieceName;
};

const PieceContainer = styled.div`
  display: flex;
  :not(:first-child) {
    margin-top: 50px;
  }
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
  const activePiece: Piece = useMemo(
    () => ({
      values: pieces[pieceCharacter],
      pieceXOffset: getPieceOffset(pieceCharacter),
      pieceYOffset: pieceCharacter === 'O' ? 1 : 0,
      pieceType: pieceCharacter,
    }),
    [pieceCharacter],
  );

  return (
    <PieceContainer>
      <PlayerBoard
        activePiece={activePiece}
        cellDataTestIdPrefix="next-piece-"
        cols={4}
        rows={4}
        width={7}
      />
    </PieceContainer>
  );
};

export default NextPiece;
