import React from 'react';
import styled from 'styled-components';

import Cell from './Cell';
import Row from './Row';

type Props = {
  rows: number;
  cols: number;
  getCellValue: (rowNb: number, colNb: number) => number;
  displayNumbers?: boolean;
  cellProps?: {
    removeBorderRadius?: boolean;
    removeBoxShadow?: boolean;
    removeMargin?: boolean;
  };
};

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

const Board = ({
  rows,
  cols,
  getCellValue,
  displayNumbers,
  cellProps,
}: Props) => (
  <>
    {[...Array(rows)].map((_, rowNb) => (
      <Row key={rowNb}>
        {displayNumbers && <RowNbContainer>{rowNb}</RowNbContainer>}
        {[...Array(cols)].map((_, colNb) => (
          <Cell
            key={colNb}
            removeBorderRadius={cellProps?.removeBorderRadius}
            removeBoxShadow={cellProps?.removeBoxShadow}
            removeMargin={cellProps?.removeMargin}
            value={getCellValue(rowNb, colNb)}
          />
        ))}
      </Row>
    ))}
    {displayNumbers && (
      <Row>
        {[...Array(cols)].map((_, colNb) => (
          <CellNbContainer key={colNb}>{colNb}</CellNbContainer>
        ))}
      </Row>
    )}
  </>
);

export default Board;
