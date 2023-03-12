import socket from '../socket/socket';
import { BLOCK } from '../constants/outgoingEvents';

const blockOpponentRows = ({
  roomName,
  playerName,
  numberOfBlockRows,
}: {
  roomName: string;
  playerName: string;
  numberOfBlockRows: number;
}) => {
  socket.emit(BLOCK, { roomName, playerName, numberOfBlockRows });
};

export default blockOpponentRows;
