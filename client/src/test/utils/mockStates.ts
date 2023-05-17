import pieces, { PieceName } from '../../constants/pieces';
import { Board, ClientState, GameState, Piece, PieceState, Player } from '../../types';
import { emptyField } from './board';

export const mockGameState = (
  state: Partial<GameState> = {},
  players: GameState['players'] = [],
  finishedPlayers: GameState['players'] = [],
): GameState => ({
  roomState: 'pending',
  players: [...players],
  finishedPlayers: [...finishedPlayers],
  ...state,
});

export const mockClientState = (state: Partial<ClientState> = {}): ClientState => ({
  playerName: 'player1',
  roomName: 'room1',
  ...state,
});

export const mockBoard = (board: Partial<Board> = {}): Board => ({
  field: emptyField,
  ...board,
});

export const mockPlayer = (state: Partial<Player> = {}, board?: Partial<Board>): Player => ({
  name: 'player1',
  roomName: 'room1',
  isAdmin: true,
  state: 'pending',
  pieces: [],
  board: mockBoard(board),
  ...state,
});

export const piecesBatch: PieceName[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

export const mockPiece = (piece: Partial<Piece> = {}, pieceSelect?: PieceName): Piece => ({
  values: pieceSelect ? pieces[pieceSelect] : pieces.J,
  pieceXOffset: 0,
  pieceYOffset: 0,
  pieceType: pieceSelect ?? 'J',
  ...piece,
});

export const mockPieceState = (pieceState: Partial<PieceState> = {}): PieceState => ({
  activePiece: mockPiece(),
  previousPiece: mockPiece({}, 'L'),
  ...pieceState,
});
