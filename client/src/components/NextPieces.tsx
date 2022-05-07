import React from 'react';
import styled from 'styled-components';
import { PieceName } from '../constants/pieces';
import NextPiece from './NextPiece';

type Props = {
  nextPieces: PieceName[];
  className?: string;
  style?: React.CSSProperties;
};

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

const Heading = styled.h2`
  font-size: 36px;
  margin-bottom: 0;
`;

const nextPiecesAmount = 3;

const NextPieces = ({ nextPieces, className, style }: Props) => (
  <Root className={className} style={style}>
    <Heading>Next pieces:</Heading>
    {nextPieces.slice(1, 1 + nextPiecesAmount).map((piece, i) => (
      <NextPiece key={i} pieceCharacter={piece} />
    ))}
  </Root>
);

export default NextPieces;
