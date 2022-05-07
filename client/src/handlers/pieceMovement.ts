import { Dispatch } from 'redux';
import { movePieceDown } from '../actions/client';
import params from '../params';
import { store } from '../store';

const pieceMoveInterval = 5000;

// const pieceMoveDownHandler = (dispatch: Dispatch) => {
//   // const dispatch = useAppDispatch();

//   // return setInterval(() => dispatch(movePieceDown()), 1500);
//   const timer = setTimeout(
//     () => dispatch(movePieceDown()),
//     pieceMoveInterval,
//   );
//   return timer;
// };

// eslint-disable-next-line no-undef
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
