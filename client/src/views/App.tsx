import React from 'react';
import styled from 'styled-components';

import { useAppSelector } from '../hooks';
import Pending from './Pending';
import Game from './Game';
import Finished from './Finished';

const Root = styled.div``;

const App = () => {
  const gameState = useAppSelector((state) => state.state.roomState);

  return (
    <Root>
      {gameState === 'pending' && <Pending />}
      {gameState === 'playing' && <Game />}
      {gameState === 'finished' && <Finished />}
    </Root>
  );
};

export default App;
