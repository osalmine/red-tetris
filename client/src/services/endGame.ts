import socket from '../socket/socket';
import { END } from '../constants/outgoingEvents';

const endGame = ({
  roomName,
  playerName,
}: {
  roomName: string;
  playerName: string;
}) => {
  socket.emit(END, { roomName, playerName });
};

export default endGame;
