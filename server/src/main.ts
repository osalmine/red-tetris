import params from '../params';
import * as server from './index';

server
  .create(params.server)
  .then(() => console.log('starting to be ready to play tetris with U ...'));
