type BaseAction<T> = {
  type: T
}

type AlertAction = BaseAction<'ALERT_POP'> & {
  message: string
}

type PingAction = BaseAction<'server/ping'> & {
  message: string
}

export type { AlertAction, PingAction }
