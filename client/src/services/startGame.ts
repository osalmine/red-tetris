import socket from '../socket/socket';
import { START } from '../constants/outgoingEvents';

const startGame = ({ roomName, initiator }: {roomName: string, initiator: string}) => {
  console.log('Start game');
  socket.emit(START, { roomName, initiator });
};

export default startGame;
