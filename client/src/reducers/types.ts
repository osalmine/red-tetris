type AlertState = {
  message: string
} | Record<string, never>;

type PongState = {
  message: string
};

type PingState = {
  count: number
};

type PlayerState = {
  playerName: string;
} | Record<string, never>;

export type { AlertState, PongState, PingState, PlayerState };
