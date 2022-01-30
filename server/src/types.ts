type ServerToClientEvents = {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  'server/pong': (arg: { message: string }) => void;
};

type BaseAction<T> = {
  type: T;
};

type AlertAction = BaseAction<'ALERT_POP'> & {
  message: string;
};

type PingAction = BaseAction<'server/ping'>;

type ClientToServerEvents = {
  action: (action: AlertAction | PingAction) => void;
  hello: () => void;
  joinRoom: ({ roomName, playerName }: {roomName: string, playerName: string}) => void;
}

export type { ServerToClientEvents, ClientToServerEvents }
