import React from 'react';
import { Board } from './Board';
import NextPieces from './NextPieces';
import styled from 'styled-components';
import { useAppSelector } from '../hooks';
import params from '../params';

const Root = styled.div`
  display: flex;
  flex: initial;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const InvinsibleBalancePiece = styled.div`
  visibility: hidden;
`;

const empty = Array(params.board.rows).fill(Array(params.board.cols).fill(0));

export const Tetris = () => {
  const player = useAppSelector(state => state.state.players.find(player => player.name === state.client.playerName));

  console.log(`player: ${JSON.stringify(player)}`);
  return (
    <Root>
      {player ?
        <>
          <InvinsibleBalancePiece>
            <NextPieces nextPieces={player.pieces} />
          </InvinsibleBalancePiece>
          <Board cols={params.board.cols} rows={params.board.rows} values={empty}/>
          <NextPieces nextPieces={player.pieces}/>
        </> :
        <div>Loading...</div>}
    </Root>);
};
