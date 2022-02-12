import React from 'react';
import { Board } from './Board';
import NextPieces from './NextPieces';
import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  flex: initial;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const InvinsibleBalancePiece = styled.div`
  visibility: hidden;
  color: brown;
`;

export const Tetris = () => (
  <Root>
    <InvinsibleBalancePiece>
      <NextPieces />
    </InvinsibleBalancePiece>
    <Board/>
    <NextPieces />
  </Root>
);

