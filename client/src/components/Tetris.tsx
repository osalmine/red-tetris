import React, { useEffect } from 'react';
import { Board } from './Board';
import NextPieces from './NextPieces';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks';
import params from '../params';
import { addNewActivePiece, movePieceDown } from '../actions/client';
import { ActivePiece } from '../reducers/types';

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

const empty = {
  values: Array(params.board.rows).fill(Array(params.board.cols).fill(0)) as number[][],
  pieceXOffset: 0,
  pieceYOffset: 0,
};

const pieceMoveInterval = 1500;

export const Tetris = () => {
  const dispatch = useAppDispatch();
  const player = useAppSelector(state => state.state.players.find(player => player.name === state.client.playerName));
  const activePiece = useAppSelector(state => state.client.activePiece);

  useEffect(() => {
    if (player) {
      dispatch(addNewActivePiece(player.pieces[0]));
    }
  }, [player, dispatch]);

  useEffect(() => {
    const timer = setTimeout(
      () => dispatch(movePieceDown()),
      pieceMoveInterval,
    );
    return () => clearTimeout(timer);
  });

  console.log(`player: ${JSON.stringify(player)}`);
  console.log(`activePiece: ${JSON.stringify(activePiece)}`);
  return (
    <Root>
      {player ?
        <>
          <InvinsibleBalancePiece>
            <NextPieces nextPieces={player.pieces} />
          </InvinsibleBalancePiece>
          {activePiece && <Board activePiece={activePiece} cols={params.board.cols} rows={params.board.rows}/>}
          <NextPieces nextPieces={player.pieces}/>
        </> :
        <div>Loading...</div>}
    </Root>);
};
