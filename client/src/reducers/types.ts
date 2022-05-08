type ActivePiece = {
  values: number[][];
  pieceXOffset: number;
  pieceYOffset: number;
};

type ClientState =
  | {
      playerName?: string;
      roomName?: string;
      activePiece?: ActivePiece | null;
      pieceIndex?: number;
    }
  | Record<string, never>;

export type { ClientState, ActivePiece };
