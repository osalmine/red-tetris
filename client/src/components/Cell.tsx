import React from 'react';
import styled from 'styled-components';

const CellContainer = styled.div`
  display: flex;
  /* border: 2px solid ${props => props.theme.red}; */
  flex: auto;
  margin: 2px;
  background-color: #313338;
  box-shadow: 0 0 3px #313338;
  border-radius: 3px;

  &::before {
    content: '';
    padding-top: 100%;
    float: left;
  }
`;

const Cell = () => <CellContainer />;

export default Cell;
