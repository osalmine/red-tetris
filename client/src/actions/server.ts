import { ThunkDispatch } from 'redux-thunk';
import pingServer from '../services/ping';
import socket from '../socket/socket';
import { RootState } from '../store';
import { PingAction } from './types';

// export const ping = (): PingAction => ({
//   type: 'server/ping',
// })

export const SERVER_PING = 'server/ping';

export const pingAction = () => (dispatch: ThunkDispatch<RootState, Record<string, never>, PingAction>) => {
  pingServer();

  // socket.on(SERVER_PING, (message: string) => {
  //   console.log('pingAction:', message);
  //   dispatch({ type: SERVER_PING, message });
  // })
}
