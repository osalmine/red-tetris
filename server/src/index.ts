import fs from 'fs'
import debug from 'debug'
import { join } from 'path';
import http, { IncomingMessage, ServerResponse } from 'http'
import * as socketio from 'socket.io';
import params from '../params'
import { ClientToServerEvents, ServerToClientEvents } from './types'

type ServerParams = typeof params.server

const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info')

const ERR = 500
const OK = 200

const initApp = (app: http.Server, params: ServerParams, cb: () => void) => {
  const { host, port } = params
  const handler = (req: IncomingMessage, res: ServerResponse) => {
    const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html'
    fs.readFile(join(__dirname, file), (err, data) => {
      if (err) {
        logerror(err)
        res.writeHead(ERR)
        return res.end('Error loading index.html')
      }
      res.writeHead(OK)
      res.end(data)
    })
  }

  app.on('request', handler)

  app.listen({ host, port }, () => {
    loginfo(`tetris listen on ${params.url}`)
    cb()
  })
}

const initEngine = (io: socketio.Server<ServerToClientEvents, ClientToServerEvents>) => {
  io.on('connection', (socket: socketio.Socket<ClientToServerEvents, ServerToClientEvents>) => {

    loginfo(`Socket connected: ${ socket.id}`)

    socket.on('action', (action) => {
      // console.log('ACTION', action)
      loginfo(`Socket action: ${ action.type}`)
      if (action.type === 'server/ping') {
        loginfo('Emit ping')
        socket.emit('server/ping', { type: 'server/ping', message: 'pong' })
      }
    })
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
})
