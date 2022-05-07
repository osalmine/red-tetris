import {
  movePieceDown,
  movePieceLeft,
  movePieceRigth,
} from '../actions/client';
import { startGame } from '../actions/server';
import { RootState, store } from '../store';

const pieceMoveInterval = 2000;

// eslint-disable-next-line no-undef
let interval: NodeJS.Timer | null;

const playerIsAdmin = (state: RootState) => {
  const adminPlayerName = state.state.players.find(
    (player) => player.isAdmin === true
  )?.name;
  return state.client.playerName === adminPlayerName;
};

const startPieceMoveInterval = () =>
  setInterval(() => {
    store.dispatch(movePieceDown());
  }, pieceMoveInterval);

document.addEventListener('keydown', (e) => {
  const state = store.getState();
  if (
    e.code === 'Enter' &&
    state.state.gameState === 'pending' &&
    playerIsAdmin(state)
  ) {
    const { playerName, roomName } = state.client;
    if (playerName && roomName) {
      store.dispatch(startGame({ playerName, roomName }));
    }
  }

  if (e.code === 'ArrowDown') {
    store.dispatch(movePieceDown());
    if (interval) {
      clearInterval(interval);
    }
    interval = startPieceMoveInterval();
  }

  if (e.code === 'ArrowRight') {
    store.dispatch(movePieceRigth());
  }
  if (e.code === 'ArrowLeft') {
    store.dispatch(movePieceLeft());
  }
});

const pieceMoveDownHandler = () => {
  const state = store.getState();

  if (state.state.gameState === 'playing' && !interval) {
    interval = startPieceMoveInterval();
  }
};

export { pieceMoveDownHandler };
