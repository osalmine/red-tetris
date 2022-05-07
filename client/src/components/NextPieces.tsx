import React from 'react';
import styled from 'styled-components';
import { PieceName } from '../constants/pieces';
import NextPiece from './NextPiece';

type Props = {
  nextPieces: PieceName[];
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

const NextPieces = ({ nextPieces }: Props) => (
  <Root>
    <Heading>Next pieces:</Heading>
    {nextPieces.slice(1, 1 + nextPiecesAmount).map((piece, i) => (
      <NextPiece key={i} pieceCharacter={piece} />
    ))}
  </Root>
);

export default NextPieces;
