type ClientToServerEvents = {
  pingAction: (arg: { type: string }) => void;
}

type BaseAction<T> = {
  type: T
}

type AlertAction = BaseAction<'ALERT_POP'> & {
  message: string
}

type PingAction = BaseAction<'server/ping'>

type ServerToClientEvents = {
  action: (action: AlertAction | PingAction) => void;
  hello: () => void
}

export type { ServerToClientEvents, ClientToServerEvents }
