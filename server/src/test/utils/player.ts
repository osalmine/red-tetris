import params from '../../../params';
import Board from '../../models/Board';
import { PlayerT } from '../../types';

export const getPlayerState = (playerKeys?: Partial<PlayerT>): PlayerT => ({
  name: 'testName',
  roomName: 'testRoomName',
  isAdmin: false,
  state: 'pending',
  board: new Board(params.board.rows, params.board.cols),
  pieces: [],
  ...playerKeys,
});
