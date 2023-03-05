import React from 'react';
import styled from 'styled-components';

import RedTetrisTitle from '../components/RedTetrisTitle';
import { useAppSelector } from '../hooks';

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Heading = styled.h2`
  font-size: 36px;
  margin: 10px 0;
`;

const Finished = () => {
  const { roomName } = useAppSelector((state) => state.player);

  return (
    <Root>
      <RedTetrisTitle />
      <Heading>Game finished in room {roomName}</Heading>
    </Root>
  );
};

export default Finished;
