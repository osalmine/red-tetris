type GameType = {
  getRoomName(): string;
}

export default class Game implements GameType {
  roomName: string

  constructor(roomName: string) {
    this.roomName = roomName
  }

  getRoomName() {
    return this.roomName
  }
}
