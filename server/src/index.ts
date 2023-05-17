import params from '../params';
import * as server from './server';

server.create(params.server).then(() => console.log(`Listening on ${params.server.url}`));
