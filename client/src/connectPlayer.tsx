import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { joinRoom } from './actions/server';
import { useAppDispatch } from './hooks';

type Props = {
  children: React.ReactNode;
};

type UrlParams = {
  roomName: string | null;
  playerName: string | null;
};

const RoomJoinWarning = styled.header``

const hashReg = /(^#[^[\]]+\[[^[\]]+\]$)/

const getHashUrl = (hash: string): UrlParams => {
  const test = hashReg.test(hash)
  console.log('test result:', test);
  if (test) {
    const roomName = ((/([^[#\]]+)/).exec(hash) as RegExpExecArray)[0]

    // console.log('ROOMNAME:', roomName)
    const playerName = ((/[^[](.+)[^\]]/).exec(((/\[+(.*)\]/).exec(hash) as RegExpExecArray)[0]) as RegExpExecArray)[0]

    // console.log('PLAYERNAME:', playerName)
    return { roomName, playerName }
  }
  return { roomName: null, playerName: null }
}

const ConnectPlayer = ({ children }: Props) => {
  const { hash } = useLocation();
  const dispatch = useAppDispatch();

  console.log('HASH', hash)
  const { roomName, playerName } = getHashUrl(hash)
  console.log('ROOMNAME:', roomName)
  console.log('PLAYERNAME:', playerName)
  if (roomName && playerName) {
    dispatch(joinRoom({ roomName, playerName }))
  }
  return (
    <>
      {(!roomName || !playerName) && <RoomJoinWarning>Enter in the following format: #42[onni]</RoomJoinWarning>}
      {children}
    </>)
}

export default ConnectPlayer
