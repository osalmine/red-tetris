import socket from '../socket/socket';
import { RESET } from '../constants/outgoingEvents';

const resetGame = ({ roomName, initiator }: { roomName: string; initiator: string }) => {
  socket.emit(RESET, { roomName, initiator });
};

export default resetGame;
