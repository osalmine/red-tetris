import debug from 'debug'
import Controller from '../models/controller';
import Game from '../models/game';
import Player from '../models/player';
import params from '../../params';

const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info')

type Props = {
  controller: Controller;
  roomName: string;
  playerName: string;
}

const onRoomJoin = ({ controller, roomName, playerName }: Props) => {
  loginfo(`JOIN ROOM: room: ${roomName} player: ${playerName}`)
  if (!controller.gameExists(roomName)) {
    controller.addGame(new Game(roomName))
  }
  const room = controller.getGame(roomName)
  if (room.playerExists(playerName)) {
    logerror('Player already exists')
    throw new Error('Player already exists')
  }
  loginfo(`room: ${JSON.stringify(room)}`)
  room.addPlayer(new Player(playerName, roomName, params.board))
  loginfo(`room after add player: ${JSON.stringify(room)}`)
  loginfo(`Room getPlayer: ${JSON.stringify(room.getPlayer(playerName))}`)
}

export default onRoomJoin
