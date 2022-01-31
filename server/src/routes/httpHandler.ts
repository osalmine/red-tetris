import fs from 'fs';
import debug from 'debug';
import { join } from 'path';
import { IncomingMessage, ServerResponse } from 'http';

const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info');

const ERR = 500;
const OK = 200;

const httpRoutesHandler = (req: IncomingMessage, res: ServerResponse) => {
  const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html';
  fs.readFile(join(__dirname, file), (err, data) => {
    if (err) {
      logerror(err);
      res.writeHead(ERR);
      return res.end('Error loading index.html');
    }
    res.writeHead(OK);
    res.end(data);
  });
};

export default httpRoutesHandler;
