import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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

const Player = styled.p<{ isClient: boolean }>`
  font-size: 18px;
  margin: 8px 0;
  color: ${({ isClient, theme }) => (isClient ? theme.green : theme.white)};

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
  const [playerIsAdmin, setPlayerIsAdmin] = useState<boolean>(false);

  useEffect(
    () =>
      setPlayerIsAdmin(
        players.find((player) => player.name === clientName)?.isAdmin ?? false
      ),
    [players, clientName]
  );

  const onStartGame = () => {
    if (clientName && roomName) {
      dispatch(startGame({ playerName: clientName, roomName }));
    }
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
      {playerIsAdmin && <StartGame onClick={onStartGame}>Start</StartGame>}
    </Root>
  );
};

export default Pending;
