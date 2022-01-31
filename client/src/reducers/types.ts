type AlertState = {
  message: string
} | Record<string, never>;

type PongState = {
  message: string
};

type PingState = {
  count: number
};

export type { AlertState, PongState, PingState };
