import debug from 'debug'
import http from 'http'
import * as socketio from 'socket.io';
import params from '../params'
import { ClientToServerEvents, ServerToClientEvents } from './types'
import initEngine from './routes/sockets';
import httpRoutesHandler from './routes/httpHandler';

type ServerParams = typeof params.server

const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info')

const initApp = (app: http.Server, params: ServerParams, cb: () => void) => {
  const { host, port } = params

  app.on('request', httpRoutesHandler)

  app.listen({ host, port }, () => {
    loginfo(`tetris listen on ${params.url}`)
    cb()
  })
}

export const create = (server: ServerParams) => new Promise(resolve => {
  const app = http.createServer()

  initApp(app, server, () => {
    const io = new socketio.Server<ServerToClientEvents, ClientToServerEvents>(app, {
      cors: {
        origin: ['http://localhost:3000'],
      },
    });
    const stopApp = (cb: () => void) => {
      io.close()
      app.close(() => {
        app.unref()
      })
      loginfo('Engine stopped.')
      cb()
    }

    initEngine(io)
    resolve({ stopApp })

  })
});
