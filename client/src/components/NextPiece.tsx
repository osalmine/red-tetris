import React from 'react';
import styled from 'styled-components';
import { Board } from './Board';

type Props = {
  pieceCharacter: string;
};

const PieceContainer = styled.div`
  display: flex;
  margin: 24px 0;
`;

const NextPiece = ({ pieceCharacter }: Props) => {
  console.log(`nextPiece: ${pieceCharacter}`);
  return (
    <PieceContainer>
      <Board cols={4} rows={4} width={15} />
    </PieceContainer>);
};

export default NextPiece;
