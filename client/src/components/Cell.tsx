import React from 'react';
import styled from 'styled-components';

type Props = {
  value: number;
  removeMargin?: boolean;
  removeBorderRadius?: boolean;
  removeBoxShadow?: boolean;
};

type CellProps = {
  cellValue: number;
  removeMargin?: boolean;
  removeBorderRadius?: boolean;
  removeBoxShadow?: boolean;
};

const CellContainer = styled.div<CellProps>`
  display: flex;
  flex: auto;
  margin: ${({ removeMargin }) => (removeMargin ? 0 : '2px')};
  background-color: ${(props) =>
    props.cellValue ? props.theme.white : '#313338'};
  box-shadow: ${({ removeBoxShadow, cellValue, theme }) =>
    !removeBoxShadow && `0 0 3px ${cellValue ? theme.white : '#313338'}`};
  border-radius: ${({ removeBorderRadius }) =>
    removeBorderRadius ? 0 : '3px'};

  &::before {
    content: '';
    padding-top: 100%;
    float: left;
  }
`;

const Cell = ({
  value,
  removeMargin,
  removeBorderRadius,
  removeBoxShadow,
}: Props) => (
  <CellContainer
    cellValue={value}
    removeBorderRadius={removeBorderRadius}
    removeBoxShadow={removeBoxShadow}
    removeMargin={removeMargin}
  />
);

export default Cell;
