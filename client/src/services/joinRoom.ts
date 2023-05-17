import socket from '../socket/socket';
import { JOIN } from '../constants/outgoingEvents';

const joinRoom = ({ roomName, playerName }: { roomName: string; playerName: string }) => {
  socket.emit(JOIN, { roomName, playerName });
};

export default joinRoom;
