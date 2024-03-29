class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class PlayerNotFoundError extends DomainError {
  data: { playerName: string };

  constructor(playerName: string) {
    super(`Player ${playerName} does not exist`);
    this.data = { playerName };
  }
}

class PlayerAlreadyExistsError extends DomainError {
  data: { playerName: string };

  constructor(playerName: string) {
    super(`Player ${playerName} already exists`);
    this.data = { playerName };
  }
}

class GameAlreadyStartedError extends DomainError {
  data: { roomName: string };

  constructor(roomName: string) {
    super(`Game ${roomName} already started`);
    this.data = { roomName };
  }
}

class GameNotFoundError extends DomainError {
  data: { roomName: string };

  constructor(roomName: string) {
    super(`Game ${roomName} not found`);
    this.data = { roomName };
  }
}

export {
  PlayerNotFoundError,
  PlayerAlreadyExistsError,
  GameAlreadyStartedError,
  GameNotFoundError,
};
