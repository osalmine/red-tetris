import { Board, ClientState, GameState, Player } from '../../types';
import { emptyField } from './board';

export const mockGameState = (
  state: Partial<GameState> = {},
  players: GameState['players'] = []
): GameState => ({
  roomState: 'pending',
  players: [...players],
  finishedPlayers: [],
  ...state,
});

export const mockClientState = (
  state: Partial<ClientState> = {}
): ClientState => ({
  playerName: 'player1',
  roomName: 'room1',
  ...state,
});

const mockBoard = (board: Partial<Board> = {}): Board => ({
  field: emptyField,
  ...board,
});

export const mockPlayer = (
  state: Partial<Player> = {},
  board?: Partial<Board>
): Player => ({
  name: 'player1',
  roomName: 'room1',
  isAdmin: true,
  state: 'pending',
  pieces: [],
  board: mockBoard(board),
  ...state,
});
