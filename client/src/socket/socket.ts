import { io } from 'socket.io-client';
import params from '../params';

const socket = io(params.server.url);

socket.on('connect', () => {
  console.log('Connected socket: ', socket);
});

// socket.on('server/ping', (message: string) => {
//   console.log('pingAction:', message);
// })

export default socket;
