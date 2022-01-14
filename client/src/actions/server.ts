import pingServer from '../services/ping';
import { PingAction } from './types';

// export const ping = (): PingAction => ({
//   type: 'server/ping',
// })

export const SERVER_PING = 'server/ping';

export const pingAction = () => async dispatch => {
  const pong = await pingServer();
  dispatch({ type: SERVER_PING })
}
