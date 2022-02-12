import React from 'react';
import styled from 'styled-components';
import params from '../params';
import Cell from './Cell';
import Row from './Row';

type Props = {
  rows: number;
  cols: number;
  width?: number;
};

const Root = styled.div`
  display: flex;
  flex: initial;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-top: 75px;
`;

const BoardContainer = styled.div<{containerWidth?: number}>`
  display: flex;
  flex: 1 1 auto;
  box-sizing: border-box;
  justify-content: center;
  border: 8px solid ${props => props.theme.white};
  box-shadow: 0 0 8px ${props => props.theme.white};
  width: ${props => (props.containerWidth ? `${props.containerWidth}vh` : '35vh')};
  padding: 1rem;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 5px;
`;

export const Board = ({ rows, cols, width }: Props) => (
  <Root>
    <BoardContainer containerWidth={width} >
      {[...Array(rows)].map((_, i) =>
        <Row key={i}>
          {[...Array(cols)].map((_, j) => <Cell key={j} />)}
        </Row>)}
    </BoardContainer>
  </Root>
);
