type PlayerAlreadyExistsError = {
  error: {
    name: 'PlayerAlreadyExistsError';
    data: {
      playerName: string;
    };
  };
};

type GameAlreadyStartedError = {
  error: {
    name: 'GameAlreadyStartedError';
    data: {
      roomName: string;
    };
  };
};

type Errors = PlayerAlreadyExistsError | GameAlreadyStartedError;

export type { Errors, PlayerAlreadyExistsError, GameAlreadyStartedError };
