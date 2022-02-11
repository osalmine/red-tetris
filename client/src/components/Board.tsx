import React from 'react';
import styled from 'styled-components';
import params from '../params';
import Cell from './Cell';
import Row from './Row';

const Root = styled.div`
  display: flex;
  flex: initial;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-top: 75px;
`;

const BoardContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  box-sizing: border-box;
  justify-content: center;
  border: 8px solid ${props => props.theme.white};
  box-shadow: 0 0 8px ${props => props.theme.white};
  width: 35vh;
  padding: 1rem;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 5px;
`;

export const Board = () => (
  <Root>
    <BoardContainer>
      {[...Array(params.board.rows)].map((_, i) =>
        <Row key={i}>
          {[...Array(params.board.cols)].map((_, j) => <Cell key={j} />)}
        </Row>)}
    </BoardContainer>
  </Root>
);
