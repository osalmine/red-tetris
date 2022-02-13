import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Board } from './Board';
import pieces, { PieceName } from '../constants/pieces';
import { ActivePiece } from '../reducers/types';

type Props = {
  pieceCharacter: PieceName;
};

const PieceContainer = styled.div`
  display: flex;
  margin: 24px 0;
`;

const NextPiece = ({ pieceCharacter }: Props) => {
  console.log(`nextPiece: ${pieceCharacter}`);

  // const renderPiece = pieces[pieceCharacter];
  const renderPiece: ActivePiece = useMemo(() => ({
    values: pieces[pieceCharacter],
    pieceXOffset: 0,
    pieceYOffset: 0,
  }), [pieceCharacter]);
  console.log(`renderPiece: ${renderPiece.values}`);
  return (
    <PieceContainer>
      <Board activePiece={renderPiece} cols={4} rows={4} width={12} />
    </PieceContainer>);
};

export default NextPiece;
