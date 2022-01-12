type Action = {
  type: string
  message: string
}

type AlertState = {
  message: string
} | Record<string, never>;

export type { Action, AlertState }
