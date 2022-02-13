import React from 'react';
import styled from 'styled-components';
import { ActivePiece } from '../reducers/types';
import Cell from './Cell';
import Row from './Row';

type Props = {
  rows: number;
  cols: number;
  activePiece: ActivePiece;
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
  justify-content: center;
  border: 8px solid ${props => props.theme.white};
  box-shadow: 0 0 8px ${props => props.theme.white};
  width: ${props => (props.containerWidth ? `${props.containerWidth}vh` : '35vh')};
  padding: 1rem;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 5px;
`;

export const Board = ({ rows, cols, activePiece, width }: Props) => {
  console.log(`activePieces values len: ${activePiece.values.length}`);
  const { values, pieceYOffset, pieceXOffset } = activePiece;
  const getPieceValue = (rowNb: number, colNb: number) => {
    // console.log(`rowNb: ${rowNb} values.length + pieceYOffset: ${values.length + pieceYOffset}`);
    // console.log(`colNb: ${colNb} values.length + pieceXOffset: ${values.length + pieceXOffset}`);
    if (rowNb < values.length + pieceYOffset && colNb < values.length + pieceXOffset) {
      return values[rowNb - pieceYOffset][colNb - pieceXOffset];
    }
    return 0;
  };

  return (
    <Root>
      <BoardContainer containerWidth={width} >
        {[...Array(rows)].map((_, rowNb) =>
          <Row key={rowNb}>
            {[...Array(cols)].map((_, colNb) =>
              <Cell
                key={colNb}
                value={getPieceValue(rowNb, colNb)}
              />,
            )}
          </Row>)}
      </BoardContainer>
    </Root>);
};
