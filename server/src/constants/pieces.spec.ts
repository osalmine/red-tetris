import { pieceNames } from './pieces';

describe('pieces', () => {
  it('pieceNames match', () => {
    expect(pieceNames).toStrictEqual(['I', 'J', 'L', 'O', 'S', 'T', 'Z']);
  });
});
