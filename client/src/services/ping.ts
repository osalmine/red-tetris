import socket from '../socket/socket'

const pingServer = async() => {
  socket.emit('action', { type: 'server/ping' })
}

export default pingServer
