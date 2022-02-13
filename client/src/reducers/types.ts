type AlertState = {
  message: string
} | Record<string, never>;

type PongState = {
  message: string
};

type PingState = {
  count: number
};

type ActivePiece = {
  values: number[][];
  pieceXOffset: number;
  pieceYOffset: number;
};

type ClientState = {
  playerName?: string;
  roomName?: string;
  activePiece?: ActivePiece
} | Record<string, never>;

export type { AlertState, PongState, PingState, ClientState, ActivePiece };
