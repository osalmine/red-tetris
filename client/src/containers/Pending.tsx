import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useAppSelector } from '../hooks';

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 10rem;
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
  color: ${props => props.theme.red};
`;

const Text = styled.p`
  font-size: 3rem;
  margin: 10px 0;
`;

const Player = styled.p`
  font-size: 1rem;  
`;

const Pending = () => {
  const players = useAppSelector(state => state.state.players);

  return (
    <Root>
      <Title><Red>Red</Red> Tetris</Title>
      <Text>Waiting to start</Text>
      <Text>Players:</Text>
      {players.map((player, i) => (
        <Player key={i}>{player.name}</Player>
      ))}
    </Root>);
};

export default Pending;
