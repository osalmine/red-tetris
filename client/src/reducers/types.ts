type AlertState = {
  message: string
} | Record<string, never>;

type PongState = {
  message: string
};

type PingState = {
  count: number
};

type ClientState = {
  playerName?: string;
  roomName?: string;
  piece?: {
    activePiece: number[][];
    pieceXOffset: number;
    pieceYOffset: number;
  }
} | Record<string, never>;

export type { AlertState, PongState, PingState, ClientState };
