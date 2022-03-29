import { Dispatch, Store } from 'redux';
import { movePieceDown } from '../actions/client';
import { startGame } from '../actions/server';
import params from '../params';
import { RootState, store } from '../store';

const pieceMoveInterval = 1500;

// const pieceMoveDownHandler = (dispatch: Dispatch) => {
//   // const dispatch = useAppDispatch();

//   // return setInterval(() => dispatch(movePieceDown()), 1500);
//   const timer = setTimeout(
//     () => dispatch(movePieceDown()),
//     pieceMoveInterval,
//   );
//   return timer;
// };

const playerIsAdmin = (state: RootState) => {
  const adminPlayerName = state.state.players.find(player => player.isAdmin === true)?.name;
  return state.client.playerName === adminPlayerName;
};

document.addEventListener('keydown', (e) => {
  console.log(`EVENT LISTENER event ${e.code}`);
  const state = store.getState();
  if (e.code === 'Enter' && state.state.gameState === 'pending' && playerIsAdmin(state)) {
    const { playerName, roomName } = state.client;
    if (playerName && roomName) {
      store.dispatch(startGame({ playerName, roomName }));
    }
  }
});

let interval: NodeJS.Timer | undefined;

const pieceMoveDownHandler = () => {
  const state = store.getState();

  if (state.state.gameState === 'playing' && !interval) {
    interval = setInterval(() => {
      store.dispatch(movePieceDown());
    }, pieceMoveInterval);
  }
  console.log('pieceMoveDownHandler');
};

export { pieceMoveDownHandler };
