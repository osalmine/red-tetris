import React from 'react';
import styled from 'styled-components';
import NextPiece from './NextPiece';

type Props = {
  nextPieces: string[];
};

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

const Heading = styled.h2`
  font-size: 36px;
  margin: 100px 0 0;
`;

const nextPiecesAmount = 3;

const NextPieces = ({ nextPieces }: Props) => {
  console.log(`nextPieces: ${nextPieces}`);
  return (
    <Root>
      <Heading>Next pieces:</Heading>
      {nextPieces.slice(0, nextPiecesAmount).map((piece, i) =>
        <NextPiece key={i} pieceCharacter={piece} />,
      )}
    </Root>);
};

export default NextPieces;
