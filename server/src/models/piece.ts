import pieces, { PieceName, pieceNames } from '../constants/pieces';
import { shuffle } from 'lodash';
import debug from 'debug';

const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info');

export default class Piece {
  gamePieces: PieceName[];

  constructor() {
    this.gamePieces = [];
  }

  addPieces(count: number) {
    return;
  }

  generateBatch(): PieceName[] {
    const batch: PieceName[] = shuffle(pieceNames);
    loginfo(`GAME METHOD generateBatch ${batch}`);
    return batch;
  }

  resetPieces() {
    this.gamePieces = [];
  }
}
