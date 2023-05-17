import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 12vw;
`;

const Red = styled.span`
  color: ${props => props.theme.red};
`;

const RedTetrisTitle = () => (
  <Title>
    <Red>Red</Red> Tetris
  </Title>
);

export default RedTetrisTitle;
