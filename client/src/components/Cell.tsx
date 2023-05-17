import React from 'react';
import styled from 'styled-components';

import { CellType, EMPTY, FILLED } from '../constants/cellType';

type Props = {
  value: CellType;
  removeMargin?: boolean;
  removeBorderRadius?: boolean;
  removeBoxShadow?: boolean;
  dataTestId: string;
};

type CellProps = {
  cellValue: CellType;
  removeMargin?: boolean;
  removeBorderRadius?: boolean;
  removeBoxShadow?: boolean;
};

const CellContainer = styled.div<CellProps>`
  display: flex;
  flex: auto;
  margin: ${({ removeMargin }) => (removeMargin ? 0 : '2px')};
  background-color: ${({ cellValue, theme }) =>
    cellValue === FILLED ? theme.white : cellValue === EMPTY ? '#313338' : '#6b6b6b'};
  box-shadow: ${({ removeBoxShadow, cellValue, theme }) =>
    !removeBoxShadow &&
    `0 0 3px ${cellValue === FILLED ? theme.white : cellValue === EMPTY ? '#313338' : '#6b6b6b'}`};
  border-radius: ${({ removeBorderRadius }) => (removeBorderRadius ? 0 : '3px')};

  &::before {
    content: '';
    padding-top: 100%;
    float: left;
  }
`;

const Cell = ({ value, removeMargin, removeBorderRadius, removeBoxShadow, dataTestId }: Props) => (
  <CellContainer
    cellValue={value}
    data-testid={dataTestId}
    removeBorderRadius={removeBorderRadius}
    removeBoxShadow={removeBoxShadow}
    removeMargin={removeMargin}
  />
);

export default Cell;
