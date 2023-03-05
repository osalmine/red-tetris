import {
  movePieceDown,
  movePieceLeft,
  movePieceRigth,
  rotatePieceRight,
  dropPiece,
} from '../actions/client';
import { startGame } from '../actions/server';
import { RootState, store } from '../store';

const pieceMoveIntervalInMs = 5000;

// eslint-disable-next-line no-undef
let interval: NodeJS.Timer | null;

const playerIsAdmin = (state: RootState) => {
  const adminPlayerName = state.state.players.find(
    (player) => player.isAdmin === true
  )?.name;
  return state.player.playerName === adminPlayerName;
};

const startPieceMoveInterval = () =>
  setInterval(() => {
    store.dispatch(movePieceDown());
  }, pieceMoveIntervalInMs);

document.addEventListener('keydown', (e) => {
  const state = store.getState();
  if (
    e.code === 'Enter' &&
    state.state.roomState === 'pending' &&
    playerIsAdmin(state)
  ) {
    const { playerName, roomName } = state.player;
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
  if (e.code === 'ArrowUp') {
    store.dispatch(rotatePieceRight());
  }
  if (e.code === 'Space') {
    store.dispatch(dropPiece());
  }
  if (e.code === 'KeyS') {
    console.log('Pause');
    if (interval) {
      clearInterval(interval);
    }
  }
  if (e.code === 'KeyR') {
    console.log('Resume');
    interval = startPieceMoveInterval();
  }
});

const pieceMoveDownHandler = () => {
  const {
    state: { players },
    player: { playerName },
  } = store.getState();
  const playerState = players.find(
    (player) => player.name === playerName
  )?.state;

  if (playerState === 'playing' && !interval) {
    interval = startPieceMoveInterval();
  } else if (playerState === 'finished' && interval) {
    clearInterval(interval);
    interval = null;
  }
};

export { pieceMoveDownHandler };
