import { PieceName, pieceNames } from '../constants/pieces';
import { shuffle } from 'lodash';
import debug from 'debug';

const loginfo = debug('tetris:info');

export default class Piece {
  generateBatch(): PieceName[] {
    const batch: PieceName[] = shuffle(pieceNames);
    loginfo(`GAME METHOD generateBatch ${batch}`);
    return batch;
  }
}
