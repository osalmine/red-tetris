export type PlayerAlreadyExistsError = {
  error: {
    name: 'PlayerAlreadyExistsError';
    data: {
      playerName: string;
    };
  };
};

export type GameAlreadyStartedError = {
  error: {
    name: 'GameAlreadyStartedError';
    data: {
      roomName: string;
    };
  };
};

export type GameNotFoundError = {
  error: {
    name: 'GameNotFoundError';
    data: {
      roomName: string;
    };
  };
};

export type Errors =
  | PlayerAlreadyExistsError
  | GameAlreadyStartedError
  | GameNotFoundError;
