import React, { useEffect } from 'react';
import { Board } from './Board';
import NextPieces from './NextPieces';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks';
import params from '../params';
import { addNewActivePiece, movePieceDown } from '../actions/client';
import { pieceMoveDownHandler } from '../handlers/pieceMovement';

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

const pieceMoveInterval = 1500;

export const Tetris = () => {
  const dispatch = useAppDispatch();
  const player = useAppSelector((state) =>
    state.state.players.find(
      (player) => player.name === state.client.playerName
    )
  );
  const activePiece = useAppSelector((state) => state.client.activePiece);
  const pieceIndex = useAppSelector((state) => state.client.pieceIndex);

  useEffect(() => {
    if (player && !activePiece) {
      dispatch(addNewActivePiece(player.pieces[pieceIndex ? pieceIndex : 0]));
    }
  }, [player, dispatch, activePiece, pieceIndex]);

  // useEffect(() => {
  //   const timer = pieceMoveDownHandler(dispatch);
  //   return () => clearTimeout(timer);
  // });

  console.log(`player: ${JSON.stringify(player)}`);
  console.log(`activePiece: ${JSON.stringify(activePiece)}`);
  return (
    <Root>
      {player ? (
        <>
          <InvinsibleBalancePiece>
            <NextPieces nextPieces={player.pieces} />
          </InvinsibleBalancePiece>
          {activePiece && (
            <Board
              activePiece={activePiece}
              cols={params.board.cols}
              rows={params.board.rows}
            />
          )}
          <NextPieces nextPieces={player.pieces.slice(pieceIndex)} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Root>
  );
};
