import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { alert as addAlert } from '../actions/alert';
import { pingAction } from '../actions/server';
import styled from 'styled-components';
import Pending from './Pending';

const Root = styled.div``;

const App = () => {
  const dispatch = useAppDispatch();

  const alert = useAppSelector(state => state.alert.message);
  const pongs = useAppSelector(state => state.pong);
  const pings = useAppSelector(state => state.ping);
  const gameState = useAppSelector(state => state.state.gameState);

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
      {gameState === 'pending' && <Pending />}
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

export default App;
