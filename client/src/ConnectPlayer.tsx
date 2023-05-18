import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { joinRoom } from './actions/server';
import RedTetrisTitle from './components/RedTetrisTitle';
import { useAppDispatch } from './hooks';
import { getHashUrl } from './utils';

type Props = {
  children: React.ReactNode;
};

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const RoomJoinWarning = styled.header``;

const ConnectPlayer = ({ children }: Props) => {
  const { hash } = useLocation();
  const dispatch = useAppDispatch();

  const { roomName, playerName } = getHashUrl(hash);

  if (roomName && playerName) {
    dispatch(joinRoom({ roomName, playerName }));
  }

  return (
    <>
      {!roomName || !playerName ? (
        <Root>
          <RoomJoinWarning>
            Enter in the following format in the URL: #{'<'}room{'>'}[{'<'}
            yourName{'>'}]
          </RoomJoinWarning>
          <RedTetrisTitle />
        </Root>
      ) : (
        children
      )}
    </>
  );
};

export default ConnectPlayer;
