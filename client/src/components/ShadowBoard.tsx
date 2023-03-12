import React, { useCallback } from 'react';
import styled from 'styled-components';

import { BLOCKED, CellType, FILLED } from '../constants/cellType';
import Board from './Board';

type Props = {
  rows: number;
  cols: number;
  boardValues?: CellType[][];
  width?: number;
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
  border: 4px solid ${(props) => props.theme.white};
  box-shadow: 0 0 8px ${(props) => props.theme.white};
  width: 70px;
  padding: 0.5rem;
  border-radius: 3px;
  flex-direction: column;
`;

export const ShadowBoard = ({ rows, cols, boardValues, width }: Props) => {
  const getCellValue = useCallback(
    (rowNb: number, colNb: number) =>
      boardValues &&
      (boardValues[rowNb][colNb] === FILLED ||
        boardValues[rowNb][colNb] === BLOCKED)
        ? boardValues[rowNb][colNb]
        : 0,
    [boardValues]
  );

  return (
    <Root>
      <BoardContainer containerWidth={width}>
        <Board
          cellProps={{
            removeBorderRadius: true,
            removeBoxShadow: true,
            removeMargin: true,
          }}
          cols={cols}
          getCellValue={getCellValue}
          rows={rows}
        />
      </BoardContainer>
    </Root>
  );
};
