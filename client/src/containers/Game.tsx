import React from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../hooks';
import { alert as addAlert } from '../actions/alert';
import { pingAction } from '../actions/server';
import { Board } from '../components/Board';

const Root = styled.div``;

const Game = () => {
  const dispatch = useAppDispatch();

  const alert = useAppSelector(state => state.alert.message);
  const pongs = useAppSelector(state => state.pong);
  const pings = useAppSelector(state => state.ping);

  console.log('pings', pings);

  const onAddAlert = () => {
    dispatch(addAlert('Tetris kohta...'));
  };

  const onPingServer = () => {
    console.log('pinging server...');
    dispatch(pingAction());
  };
  return (
    <Root>
      <Board />
      <button onClick={onAddAlert}>Add alert</button>
      <span>{alert}</span>
      <br/>
      <button onClick={onPingServer}>Ping server {pings.count} times</button>
      <ul>{pongs.map((pong, i) => (
        <li key={i}>{pong.message}</li>
      ))}
      </ul>
    </Root>
  );
};

export default Game;
