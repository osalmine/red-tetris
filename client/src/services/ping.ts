import socket from '../socket/socket'

const pingServer = () => {
  console.log('pingServer');
  socket.emit('action', { type: 'server/ping' })
}

export default pingServer
