import { io } from 'socket.io-client';

import params from '../params';

const socket = io(params.server.url);

socket.on('connect', () => {
  console.log('Connected');
});
export default socket;
