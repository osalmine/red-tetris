type BaseAction<T> = {
  type: T
}

type AlertAction = BaseAction<'ALERT_POP'> & {
  message: string
}

type PingAction = {
  type: string
}

type PongAction = BaseAction<'server/pong'> & {
  message: string
}

export type { AlertAction, PingAction, PongAction }
