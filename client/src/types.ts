type PlayerObject = {
  name: string;
  roomName: string;
  isAdmin: boolean;
  state: 'pending' | 'playing' | 'finished';
};

type UpdateState = {
  gameState: 'pending' | 'playing' | 'finished';
  players: PlayerObject[];
};

type PlayerAlreadyExistsError = {
  error: {
    name: 'PlayerAlreadyExistsError';
    data: {
      playerName: string;
    }
  }
};

export type { UpdateState, PlayerAlreadyExistsError };
