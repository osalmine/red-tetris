import fs from 'fs'
import debug from 'debug'
import http from 'http'
import * as socketio from 'socket.io';

// const socketIO = require('socket.io')

// import socketIO from 'socket.io'
import params from '../params'
import { ClientToServerEvents, ServerToClientEvents } from './types'

type ServerParams = typeof params.server

const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info')

const initApp = (app, params, cb) => {
  const { host, port } = params
  const handler = (req, res) => {
    const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html'
    fs.readFile(__dirname + file, (err, data) => {
      if (err) {
        logerror(err)
        res.writeHead(500)
        return res.end('Error loading index.html')
      }
      res.writeHead(200)
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
      console.log('ACTION', action)
      if (action.type === 'server/ping') {
        socket.emit('pingAction', { type: 'server/ping', message: 'pong' })
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
