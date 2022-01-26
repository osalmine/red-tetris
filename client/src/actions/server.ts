import * as incomingEvents from '../constants/incomingEvents';
import * as outgoingEvents from '../constants/outgoingEvents';

// export const ping = (): PingAction => ({
//   type: 'server/ping',
// })

export const pongAction = (message: string) => {
  console.log('pongAction');

  // socket.on(SERVER_PING, ({ message }: {message: string}) => {
  //   console.log('pingAction message:', message);

  //   dispatch({ type: SERVER_PING, message });
  // })
  return ({ type: incomingEvents.PONG, message });

}

export const pingAction = () => {
  console.log('pingAction');
  return ({ type: outgoingEvents.PING });
}
