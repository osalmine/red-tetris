import Board from './Board';

describe('Board', () => {
  const rows = 20;
  const cols = 10;
  const board = new Board(rows, cols);

  it('creates a field', () => {
    expect(board.field).toBeArray();
  });
});
