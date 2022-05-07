import React from 'react';
import styled from 'styled-components';

type Props = {
  value: number;
};

type CellProps = {
  cellValue: number;
};

const CellContainer = styled.div<CellProps>`
  display: flex;
  flex: auto;
  margin: 2px;
  background-color: ${(props) =>
    props.cellValue ? props.theme.white : '#313338'};
  box-shadow: 0 0 3px
    ${(props) => (props.cellValue ? props.theme.white : '#313338')};
  border-radius: 3px;

  &::before {
    content: '';
    padding-top: 100%;
    float: left;
  }
`;

const Cell = ({ value }: Props) => <CellContainer cellValue={value} />;

export default Cell;
