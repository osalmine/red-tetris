/* eslint-disable no-magic-numbers */
import fs from 'fs';
import path from 'path';
import { IncomingMessage, ServerResponse } from 'http';

const MIME_TYPES = {
  default: 'application/octet-stream',
  html: 'text/html; charset=UTF-8',
  js: 'application/javascript',
  css: 'text/css',
  png: 'image/png',
  jpg: 'image/jpg',
  gif: 'image/gif',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
};

const distFolder = path.resolve(__dirname, '..', '..', '..', 'dist');

const toBool = [() => true, () => false];

const getFile = async (url: string) => {
  const paths = [distFolder, url];
  console.log('url:', url);
  if (url.endsWith('/')) {
    paths.push('index.html');
  }
  const filePath = path.join(...paths);
  console.log('filePath', filePath);
  const pathTraversal = !filePath.startsWith(distFolder);
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;
  const streamPath: string | null = found ? filePath : null;
  const ext = streamPath
    ? path.extname(streamPath).substring(1).toLowerCase()
    : null;
  const stream = streamPath ? fs.createReadStream(streamPath) : null;
  return { found, ext, stream };
};

const httpRoutesHandler = async (req: IncomingMessage, res: ServerResponse) => {
  const file = await getFile(req.url);
  const statusCode = file.found ? 200 : 404;
  const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
  res.writeHead(statusCode, { 'Content-Type': mimeType });
  file.stream ? file.stream.pipe(res) : res.end();
};

export default httpRoutesHandler;
