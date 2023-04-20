import { emptyField } from 'test/utils/board';

import {
  addNewActivePiece,
  movePieceDown,
  movePieceRight,
  movePieceLeft,
  rotatePieceRight,
  rotatePieceLeft,
  dropPiece,
} from './client';
import pieces from '../constants/pieces';
import * as internalEvents from '../constants/internalEvents';
import { store } from '../store';

jest.mock('../store', () => {
  const store = jest.requireActual('../store');
  store.getState = jest.fn();
  return { store };
});

describe('Actions', () => {
  const board = { field: emptyField };
  beforeEach(() => {
    const playerName = 'testPlayer';
    (store.getState as jest.Mock).mockImplementation(() => ({
      state: { players: [{ name: playerName, board }] },
      player: { playerName },
    }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('addNewActivePiece should return a valid action', () => {
    const nextPieceCharacter = 'I';

    const action = addNewActivePiece(nextPieceCharacter);
    expect(action.type).toBe(internalEvents.ACTIVE_PIECE);
    expect(action.values).toBe(pieces[nextPieceCharacter]);
    expect(action.pieceXOffset).toBeGreaterThanOrEqual(3);
    expect(action.pieceYOffset).toBeLessThanOrEqual(0);
    expect(action.pieceType).toBe(nextPieceCharacter);
  });

  it('movePieceDown should return a valid action', () => {
    const action = movePieceDown();
    expect(action.type).toBe(internalEvents.MOVE_DOWN);
    expect(action.board).toBe(board);
  });

  it('movePieceRight should return a valid action', () => {
    const action = movePieceRight();
    expect(action.type).toBe(internalEvents.MOVE_RIGHT);
    expect(action.board).toBe(board);
  });

  it('movePieceLeft should return a valid action', () => {
    const action = movePieceLeft();
    expect(action.type).toBe(internalEvents.MOVE_LEFT);
    expect(action.board).toBe(board);
  });

  it('rotatePieceRight should return a valid action', () => {
    const action = rotatePieceRight();
    expect(action.type).toBe(internalEvents.ROTATE_RIGHT);
    expect(action.board).toBe(board);
  });

  it('rotatePieceLeft should return a valid action', () => {
    const action = rotatePieceLeft();
    expect(action.type).toBe(internalEvents.ROTATE_LEFT);
  });

  it('dropPiece should return a valid action', () => {
    const action = dropPiece();
    expect(action.type).toBe(internalEvents.DROP_PIECE);
    expect(action.board).toBe(board);
  });
});
