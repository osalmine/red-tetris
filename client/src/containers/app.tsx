import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks';
import { alert as addAlert } from '../actions/alert';

// import pingServer from '../services/ping';
import socket from '../socket/socket';
import { pingAction } from '../actions/server';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useAppDispatch();
  const dis = useDispatch()
  const alert = useAppSelector(state => state.alert.message);

  const onAddAlert = () => {
    dispatch(addAlert('Tetris kohta...'));
  }

  const onPingServer = async() => {
    console.log('pinging server...');

    // pingServer();
    dis(pingAction())

    // socket.on('server/ping', (data) => {
    //   console.log('Ping: ', data);
    // })
  }

  return (
    <>
      <button onClick={onAddAlert}>Add alert</button>
      <span>{alert}</span>
      <br/>
      <button onClick={onPingServer}>Ping server</button>
    </>
  )
}

// const mapStateToProps = (state: any) => ({
//   message: state.message,
// })
// export default connect(mapStateToProps, null)(App)

export default App
