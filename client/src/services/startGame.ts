import socket from '../socket/socket';
import { START } from '../constants/outgoingEvents';

const startGame = ({
  roomName,
  initiator,
}: {
  roomName: string;
  initiator: string;
}) => {
  socket.emit(START, { roomName, initiator });
};

export default startGame;
