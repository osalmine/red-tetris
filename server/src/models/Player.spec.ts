import params from '../../params';
import {
  boardWithFilledCells,
  emptyBoard,
  piecesBatch,
  boardWithFilledCellsAndTwoBlockedRows,
  emptyBoardWithTwoBlockedRows,
} from 'test/utils';
import Player from './Player';

describe('Player', () => {
  const playerName = 'testName';
  const roomName = '42';
  let player: Player;

  beforeEach(() => {
    player = new Player(playerName, roomName, params.board);
  });

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
  it('updates the pieces', () => {
    expect(player.pieces).toStrictEqual([]);
    player.updatePieces(piecesBatch);
    expect(player.pieces).toStrictEqual(piecesBatch);
  });
  it('adds pieces', () => {
    expect(player.pieces).toStrictEqual([]);
    player.addPieces(piecesBatch);
    player.addPieces(piecesBatch);
    expect(player.pieces).toStrictEqual([...piecesBatch, ...piecesBatch]);
  });
  it('sets the state', () => {
    expect(player.state).toBe('pending');
    player.setState('playing');
    expect(player.state).toBe('playing');
  });
  it('resets the player', () => {
    player.updateBoard(boardWithFilledCells);
    player.updatePieces(piecesBatch);
    player.setState('playing');
    player.resetPlayer();
    expect(player.board.field).toStrictEqual(emptyBoard.field);
    expect(player.pieces).toStrictEqual([]);
    expect(player.state).toBe('pending');
  });
  it('adds blocked rows to empty board', () => {
    player.updateBoard(emptyBoard);
    expect(player.board).toStrictEqual(emptyBoard);
    player.addBlockedRows(2);
    expect(player.board).toStrictEqual(emptyBoardWithTwoBlockedRows);
  });
  it('adds blocked rows to full board and ends the game', () => {
    player.updateBoard(boardWithFilledCells);
    expect(player.board).toStrictEqual(boardWithFilledCells);
    expect(player.state).toBe('pending');
    player.addBlockedRows(2);
    expect(player.board).toStrictEqual(boardWithFilledCellsAndTwoBlockedRows);
    expect(player.state).toBe('finished');
  });
});
