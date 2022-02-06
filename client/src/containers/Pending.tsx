import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import { startGame } from '../actions/server';
import RedTetrisTitle from '../components/RedTetrisTitle';
import { useAppDispatch, useAppSelector } from '../hooks';

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

const StartGame = styled.button.attrs(() => ({
  type: 'submit',
}))`
  background: ${props => props.theme.green};
  border: 1px solid ${props => props.theme.green};
  border-radius: 6px;
  box-sizing: border-box;
  color: ${props => props.theme.white};
  cursor: pointer;
  display: inline-block;
  font-size: 22px;
  line-height: 16px;
  min-height: 40px;
  outline: 0;
  padding: 16px 18px;
  text-align: center;
  user-select: none;
  touch-action: manipulation;
  vertical-align: middle;

&:hover,
&:active {
  background-color: initial;
  background-position: 0 0;
  color: ${props => props.theme.green};
}

&:active {
  opacity: .5;
}
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
      <StartGame onClick={onNotification}>Notification</StartGame>
      {playerIsAdmin && <StartGame onClick={onStartGame}>Start</StartGame>}
    </Root>);
};

export default Pending;
