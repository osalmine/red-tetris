import React, { useCallback } from 'react';
import styled from 'styled-components';

import { BLOCKED, CellType, FILLED } from '../constants/cellType';
import Board from './Board';

type Props = {
  rows: number;
  cols: number;
  boardValues?: CellType[][];
  name: string;
  isGameOver: boolean;
};

const Root = styled.div`
  display: flex;
  flex: initial;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

const ShadowBoardContainer = styled.div<{ isGameOver: boolean }>`
  display: flex;
  justify-content: center;
`;

const BoardContainer = styled.div<{ isGameOver: boolean }>`
  display: flex;
  border: 4px solid ${(props) => props.theme.white};
  box-shadow: 0 0 8px ${(props) => props.theme.white};
  width: 70px;
  padding: 0.5rem;
  border-radius: 3px;
  flex-direction: column;
  margin-bottom: 4px;
  opacity: ${({ isGameOver }) => (isGameOver ? '0.1' : null)};
`;

const GameOver = styled.p`
  position: absolute;
  justify-self: center;
  align-self: center;
`;

export const ShadowBoard = ({
  rows,
  cols,
  boardValues,
  name,
  isGameOver,
}: Props) => {
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
      <ShadowBoardContainer isGameOver={isGameOver}>
        <BoardContainer isGameOver={isGameOver}>
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
        {isGameOver && <GameOver>Game Over</GameOver>}
      </ShadowBoardContainer>
      {name}
    </Root>
  );
};
