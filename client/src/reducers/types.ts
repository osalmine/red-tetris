type AlertState = {
  message: string
} | Record<string, never>;

type PingState = {
  message: string
} | Record<string, never>;

export type { AlertState, PingState }
