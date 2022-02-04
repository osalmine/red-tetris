import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RedTetrisTitle from '../components/RedTetrisTitle';
import { useAppSelector } from '../hooks';

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  const clientName = useAppSelector(state => state.player.playerName);
  const [playerIsAdmin, setPlayerIsAdmin] = useState<boolean | undefined>(false);

  useEffect(() => setPlayerIsAdmin(players.find(player => player.name === clientName)?.isAdmin), [players, clientName]);

  return (
    <Root>
      <RedTetrisTitle />
      <Text>Waiting to start</Text>
      <Text>Players:</Text>
      {players.map((player, i) => (
        <Player key={i}>{player.name}</Player>
      ))}
      {console.log('playerIsAdmin:', playerIsAdmin)}
      {playerIsAdmin && <button>Start game</button>}
    </Root>);
};

export default Pending;
