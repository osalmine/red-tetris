import React from 'react';
import styled from 'styled-components';

import { useAppSelector } from '../hooks';
import Pending from './Pending';
import Game from './Game';

const Root = styled.div``;

const App = () => {
  const gameState = useAppSelector((state) => state.state.gameState);

  return (
    <Root>
      {gameState === 'pending' && <Pending />}
      {gameState === 'playing' && <Game />}
    </Root>
  );
};

export default App;
