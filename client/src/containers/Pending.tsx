import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import { startGame } from '../actions/server';
import RedTetrisTitle from '../components/RedTetrisTitle';
import { useAppDispatch, useAppSelector } from '../hooks';
import { default as StartGame } from '../components/Button';

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
  const dispatch = useAppDispatch();

  const players = useAppSelector(state => state.state.players);
  const { playerName: clientName, roomName } = useAppSelector(state => state.client);
  const [playerIsAdmin, setPlayerIsAdmin] = useState<boolean | undefined>(false);

  useEffect(() => setPlayerIsAdmin(players.find(player => player.name === clientName)?.isAdmin), [players, clientName]);

  const onStartGame = () => {
    console.log('Start game');
    dispatch(startGame({ playerName: clientName, roomName }));
  };

  const onNotification = () => {
    Store.addNotification({
      title: 'Error with game',
      message: 'Reload the page',
      container: 'top-right',
      type: 'danger',
      insert: 'top',
      dismiss: {
        duration: 2000,
        onScreen: true,
        pauseOnHover: true,
      },
    });
  };

  return (
    <Root>
      <RedTetrisTitle />
      <Text>Waiting to start</Text>
      <Text>Players:</Text>
      {players.map((player, i) => (
        <Player key={i}>{player.name}</Player>
      ))}
      <StartGame color={'grey'} onClick={onNotification}>Notification</StartGame>
      {playerIsAdmin && <StartGame onClick={onStartGame}>Start</StartGame>}
    </Root>);
};

export default Pending;
