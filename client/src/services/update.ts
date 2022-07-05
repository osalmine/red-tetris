import socket from '../socket/socket';
import { UPDATE } from '../constants/outgoingEvents';
import { Player } from '../reducers/types';

const updateState = ({
  playerState,
  roomName,
}: {
  playerState: Player;
  roomName: string;
}) => {
  socket.emit(UPDATE, { playerState, roomName });
};

export default updateState;
