import React from 'react';
import styled from 'styled-components';
import { Board } from './Board';
import pieces, { PieceName } from '../constants/pieces';

type Props = {
  pieceCharacter: PieceName;
};

const PieceContainer = styled.div`
  display: flex;
  margin: 24px 0;
`;

const NextPiece = ({ pieceCharacter }: Props) => {
  console.log(`nextPiece: ${pieceCharacter}`);
  const renderPiece = pieces[pieceCharacter];
  console.log(`renderPiece: ${renderPiece}`);
  return (
    <PieceContainer>
      <Board cols={4} rows={4} values={renderPiece} width={12} />
    </PieceContainer>);
};

export default NextPiece;
