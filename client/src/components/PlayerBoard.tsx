import React, { useCallback } from 'react';
import styled from 'styled-components';

import { BLOCKED, CellType, FILLED } from '../constants/cellType';
import { Piece } from '../types';
import Board from './Board';

type Props = {
  rows: number;
  cols: number;
  activePiece?: Piece | null;
  boardValues?: CellType[][];
  width?: number;
  displayNumbers?: boolean;
  cellDataTestIdPrefix?: string;
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
  border: 8px solid ${props => props.theme.white};
  box-shadow: 0 0 8px ${props => props.theme.white};
  width: ${({ containerWidth }) => (containerWidth ? `${containerWidth}vw` : '22rem')};
  padding: 1rem;
  flex-direction: column;
  border-radius: 5px;
  flex: 0 1;
`;

export const PlayerBoard = ({
  rows,
  cols,
  activePiece,
  boardValues,
  width,
  displayNumbers,
  cellDataTestIdPrefix,
}: Props) => {
  const getPieceValue = useCallback(
    (rowNb: number, colNb: number): CellType => {
      if (
        activePiece &&
        rowNb < activePiece.values.length + activePiece.pieceYOffset &&
        rowNb - activePiece.pieceYOffset >= 0 &&
        colNb < activePiece.values.length + activePiece.pieceXOffset &&
        colNb - activePiece.pieceXOffset >= 0
      ) {
        return activePiece.values[rowNb - activePiece.pieceYOffset][
          colNb - activePiece.pieceXOffset
        ];
      }
      return 0;
    },
    [activePiece],
  );

  const getCellValue = useCallback(
    (rowNb: number, colNb: number): CellType =>
      boardValues && (boardValues[rowNb][colNb] === FILLED || boardValues[rowNb][colNb] === BLOCKED)
        ? boardValues[rowNb][colNb]
        : getPieceValue(rowNb, colNb),
    [boardValues, getPieceValue],
  );

  return (
    <Root>
      <BoardContainer containerWidth={width}>
        <Board
          cellProps={{ cellDataTestIdPrefix }}
          cols={cols}
          displayNumbers={displayNumbers}
          getCellValue={getCellValue}
          rows={rows}
        />
      </BoardContainer>
    </Root>
  );
};
