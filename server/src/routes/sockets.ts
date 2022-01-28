import * as socketio from 'socket.io';
import debug from 'debug'
import { ClientToServerEvents, ServerToClientEvents } from '../types'

const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info')

const initEngine = (io: socketio.Server<ServerToClientEvents, ClientToServerEvents>) => {
  io.on('connection', (socket: socketio.Socket<ClientToServerEvents, ServerToClientEvents>) => {

    loginfo(`Socket connected: ${ socket.id}`)

    socket.on('action', (action) => {
      // console.log('ACTION', action)
      loginfo(`Socket action: ${ action.type}`)
      if (action.type === 'server/ping') {
        loginfo('Emit ping')
        socket.emit('server/pong', { message: 'pong' })
      }
    })
  })
}

export default initEngine
