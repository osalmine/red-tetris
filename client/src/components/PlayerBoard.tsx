import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Piece } from '../types';
import Board from './Board';

type Props = {
  rows: number;
  cols: number;
  activePiece: Piece;
  boardValues?: number[][];
  width?: number;
  displayNumbers?: boolean;
};

const Root = styled.div`
  display: flex;
  flex: initial;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

const BoardContainer = styled.div<{ containerWidth?: number }>`
  display: flex;
  border: 8px solid ${(props) => props.theme.white};
  box-shadow: 0 0 8px ${(props) => props.theme.white};
  width: ${({ containerWidth }) =>
    containerWidth ? `${containerWidth}vw` : '22rem'};
  padding: 1rem;
  flex-direction: column;
  border-radius: 5px;
  flex: 1;
  /* max-height: 704.1px; */
`;

export const PlayerBoard = ({
  rows,
  cols,
  activePiece,
  boardValues,
  width,
  displayNumbers,
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
        <Board
          cols={cols}
          displayNumbers={displayNumbers}
          getCellValue={getCellValue}
          rows={rows}
        />
      </BoardContainer>
    </Root>
  );
};
