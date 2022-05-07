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

const Heading = styled.h2`
  font-size: 36px;
  margin: 10px 0;
`;

const Players = styled.p`
  font-size: 28px;
  margin: 30px 0 15px;
`;

type PlayerProps = {
  isClient: boolean;
};

const Player = styled.p<PlayerProps>`
  font-size: 18px;
  margin: 8px 0;
  color: ${(props) => (props.isClient ? props.theme.green : props.theme.white)};

  &:last-of-type {
    margin-bottom: 50px;
  }
`;

const Pending = () => {
  const dispatch = useAppDispatch();

  const players = useAppSelector((state) => state.state.players);
  const { playerName: clientName, roomName } = useAppSelector(
    (state) => state.client
  );
  const [playerIsAdmin, setPlayerIsAdmin] = useState<boolean | undefined>(
    false
  );

  useEffect(
    () =>
      setPlayerIsAdmin(
        players.find((player) => player.name === clientName)?.isAdmin
      ),
    [players, clientName]
  );

  const onStartGame = () => {
    console.log('Start game');
    if (clientName && roomName) {
      dispatch(startGame({ playerName: clientName, roomName }));
    }
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
      <Heading>Waiting to start in lobby {roomName}</Heading>
      <Players>Players:</Players>
      {players.map((player, i) => (
        <Player isClient={player.name === clientName} key={i}>
          {player.name}
          {player.isAdmin && ' ★'}
        </Player>
      ))}
      <StartGame color={'grey'} onClick={onNotification}>
        Notification
      </StartGame>
      {playerIsAdmin && <StartGame onClick={onStartGame}>Start</StartGame>}
    </Root>
  );
};

export default Pending;
