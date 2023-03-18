import params from '../../params';
import { boardWithFilledCells, emptyBoard } from 'test/utils';
import Player from './Player';

describe('Player', () => {
  const playerName = 'testName';
  const roomName = '42';
  const player = new Player(playerName, roomName, params.board);

  it('should assign admin', () => {
    expect(player.isAdmin).toBe(false);
    player.assignAdmin();
    expect(player.isAdmin).toBe(true);
  });
  it('updates the board', () => {
    const updateBoardSpy = jest.spyOn(player, 'updateBoard');
    expect(player.board.field).toStrictEqual(emptyBoard.field);
    player.updateBoard(boardWithFilledCells);
    expect(updateBoardSpy).toHaveBeenCalledWith(boardWithFilledCells);
    expect(player.board.field).toStrictEqual(boardWithFilledCells.field);
    updateBoardSpy.mockClear();
  });
});
