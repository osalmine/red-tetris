import React from 'react';
import styled, { keyframes } from 'styled-components';

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 12vw;
`;

// const glow = keyframes
//   from {
//     text-shadow: 0 0 0 #FF0035;
//   }
//   to {
//     text-shadow: 5px 5px 10px #FF0035;
//   }
// `;

/* -webkit-animation: ${glow} 3s ease-in-out infinite alternate;
  -moz-animation: ${glow} 3s ease-in-out infinite alternate;
  animation: ${glow} 3s ease-in-out infinite alternate; */

const Red = styled.span`
  color: ${(props) => props.theme.red};
`;

const RedTetrisTitle = () => (
  <Title>
    <Red>Red</Red> Tetris
  </Title>
);

export default RedTetrisTitle;
