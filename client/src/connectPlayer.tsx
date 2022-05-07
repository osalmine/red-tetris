import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { joinRoom } from './actions/server';
import RedTetrisTitle from './components/RedTetrisTitle';
import { useAppDispatch } from './hooks';

type Props = {
  children: React.ReactNode;
};

type UrlParams = {
  roomName: string | null;
  playerName: string | null;
};

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const RoomJoinWarning = styled.header``;

const hashReg = /(^#[^[\]]+\[[^[\]]+\]$)/;

const getHashUrl = (hash: string): UrlParams => {
  const test = hashReg.test(hash);

  // console.log('test result:', test);
  if (test) {
    const roomName = (/([^[#\]]+)/.exec(hash) as RegExpExecArray)[0];

    // console.log('ROOMNAME:', roomName);
    // console.log('playerName exec:', (/\[+(.*)\]/).exec(hash));
    const playerName = (/\[+(.*)\]/.exec(hash) as RegExpExecArray)[1];

    // const playerName =
    // ((/[^[](.+)[^\]]/).exec(((/\[+(.*)\]/).exec(hash) as RegExpExecArray)[0]) as RegExpExecArray)[0];

    // console.log('PLAYERNAME:', playerName);
    return { roomName, playerName };
  }
  return { roomName: null, playerName: null };
};

const ConnectPlayer = ({ children }: Props) => {
  const { hash } = useLocation();
  const dispatch = useAppDispatch();

  // console.log('HASH', hash);
  const { roomName, playerName } = getHashUrl(hash);

  // console.log('ROOMNAME:', roomName);
  // console.log('PLAYERNAME:', playerName);
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
