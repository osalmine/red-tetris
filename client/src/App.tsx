import { useAppSelector } from './hooks';
import Pending from './views/Pending';
import Game from './views/Game';
import Finished from './views/Finished';

const App = () => {
  const gameState = useAppSelector(state => state.state.roomState);

  return (
    <>
      {gameState === 'pending' && <Pending />}
      {gameState === 'playing' && <Game />}
      {gameState === 'finished' && <Finished />}
    </>
  );
};

export default App;
