import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks';
import { alert as addAlert } from '../actions/alert';

import pingServer from '../services/ping';
import socket from '../socket/socket';
import { pingAction } from '../actions/server';

// import { useDispatch } from 'react-redux';
import { PingState, PongState } from '../reducers/types';

const App = () => {
  const dispatch = useAppDispatch();

  // const dis = useDispatch()
  const alert = useAppSelector(state => state.alert.message);
  const pongs: PongState[] = useAppSelector(state => state.pong);
  const pings: PingState = useAppSelector(state => state.ping);

  console.log('pings', pings);

  const onAddAlert = () => {
    dispatch(addAlert('Tetris kohta...'));
  }

  const onPingServer = () => {
    console.log('pinging server...');

    dispatch(pingAction());

    // pingServer();

    // dis(pingAction())
  }

  return (
    <>
      <button onClick={onAddAlert}>Add alert</button>
      <span>{alert}</span>
      <br/>
      <button onClick={onPingServer}>Ping server {pings.count} times</button>
      <ul>{pongs.map((pong, i) => (
        <li key={i}>{pong.message}</li>
      ))}
      </ul>
    </>
  )
}

// const mapStateToProps = (state: any) => ({
//   message: state.message,
// })
// export default connect(mapStateToProps, null)(App)

export default App
