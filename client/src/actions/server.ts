import * as incomingEvents from '../constants/incomingEvents';
import * as outgoingEvents from '../constants/outgoingEvents';

export const pongAction = (message: string) => {
  console.log('pongAction');
  return ({ type: incomingEvents.PONG, message });

}

export const pingAction = () => {
  console.log('pingAction');
  return ({ type: outgoingEvents.PING });
}

export const joinRoom = ({ roomName, playerName }: {roomName: string, playerName: string}) => ({
  type: outgoingEvents.JOIN,
  roomName,
  playerName,
})
