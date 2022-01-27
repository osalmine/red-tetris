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

type AllActions = AlertAction | PingAction | PongAction

export type { AllActions, AlertAction, PingAction, PongAction }
