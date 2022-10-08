import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Piece } from '../reducers/types';
import Cell from './Cell';
import Row from './Row';

type Props = {
  rows: number;
  cols: number;
  activePiece: Piece;
  boardValues?: number[][];
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

const BoardContainer = styled.div<{ containerWidth?: number }>`
  display: flex;
  justify-content: center;
  border: 8px solid ${(props) => props.theme.white};
  box-shadow: 0 0 8px ${(props) => props.theme.white};
  width: ${({ containerWidth }) =>
    containerWidth ? `${containerWidth}vh` : '35vh'};
  padding: 1rem;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 5px;
`;

const RowNbContainer = styled.div`
  width: 26px;
  align-self: center;
`;

const CellNbContainer = styled.div`
  width: 32px;
  justify-self: center;
  margin-left: 10px;

  :first-child {
    margin-left: 36px;
  }
`;

export const Board = ({
  rows,
  cols,
  activePiece,
  boardValues,
  width,
}: Props) => {
  const { values, pieceYOffset, pieceXOffset } = activePiece;
  const getPieceValue = useCallback(
    (rowNb: number, colNb: number) => {
      if (
        rowNb < values.length + pieceYOffset &&
        rowNb - pieceYOffset >= 0 &&
        colNb < values.length + pieceXOffset &&
        colNb - pieceXOffset >= 0
      ) {
        return values[rowNb - pieceYOffset][colNb - pieceXOffset];
      }
      return 0;
    },
    [values, pieceYOffset, pieceXOffset]
  );

  const getCellValue = useCallback(
    (rowNb: number, colNb: number) =>
      boardValues && boardValues[rowNb][colNb] === 1
        ? 1
        : getPieceValue(rowNb, colNb),
    [boardValues, getPieceValue]
  );

  return (
    <Root>
      <BoardContainer containerWidth={width}>
        {[...Array(rows)].map((_, rowNb) => (
          <Row key={rowNb}>
            <RowNbContainer>{rowNb}</RowNbContainer>
            {[...Array(cols)].map((_, colNb) => (
              <Cell key={colNb} value={getCellValue(rowNb, colNb)} />
            ))}
          </Row>
        ))}
        <Row>
          {[...Array(cols)].map((_, colNb) => (
            <CellNbContainer key={colNb}>{colNb}</CellNbContainer>
          ))}
        </Row>
      </BoardContainer>
    </Root>
  );
};
