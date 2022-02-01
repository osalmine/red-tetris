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

type ServerToClientEvents = {
  'server/pong': (arg: { message: string }) => void;
  updateState: ({ gameState, players }: UpdateState) => void;
};

type BaseAction<T> = {
  type: T;
};

type PingAction = BaseAction<'server/ping'>;

type ClientToServerEvents = {
  action: (action: PingAction) => void;
  joinRoom: ({ roomName, playerName }: {roomName: string, playerName: string}) => void;
};

export type { ServerToClientEvents, ClientToServerEvents };
