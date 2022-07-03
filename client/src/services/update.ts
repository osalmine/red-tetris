import socket from '../socket/socket';
import { UPDATE } from '../constants/outgoingEvents';
import { GameState } from '../reducers/types';

const startGame = (gameState: GameState) => {
  socket.emit(UPDATE, gameState);
};

export default startGame;
