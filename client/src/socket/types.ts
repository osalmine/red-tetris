type ClientToServerEvents = {
  pingAction: (arg: { type: string }) => void;
};

type BaseAction<T> = {
  type: T;
};

type PingAction = BaseAction<'server/ping'> & {
  message: string;
};

type ServerToClientEvents = {
  action: (action: PingAction) => void;
  hello: () => void;
};

export type { ServerToClientEvents, ClientToServerEvents };
