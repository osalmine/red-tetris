type server_ping = 'server/ping';

type ServerToClientEvents = {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  'server/ping': (arg: { type: server_ping, message: string }) => void;
}

type BaseAction<T> = {
  type: T
}

type AlertAction = BaseAction<'ALERT_POP'> & {
  message: string
}

type PingAction = BaseAction<'server/ping'>

type ClientToServerEvents = {
  action: (action: AlertAction | PingAction) => void;
  hello: () => void
}

export type { ServerToClientEvents, ClientToServerEvents }
