import React, { useEffect } from 'react';
import { Board } from './Board';
import NextPieces from './NextPieces';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks';
import params from '../params';
import { addNewActivePiece, addPieceIndex } from '../actions/client';

const Root = styled.div`
  display: flex;
  flex: initial;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const InvinsibleBalancePiece = styled.div`
  visibility: hidden;
  height: 0;
`;

export const Tetris = () => {
  const dispatch = useAppDispatch();
  const player = useAppSelector((state) =>
    state.state.players.find(
      (player) => player.name === state.player.playerName
    )
  );
  const activePiece = useAppSelector((state) => state.piece.activePiece);
  const pieceIndex = useAppSelector((state) => state.player.pieceIndex);

  useEffect(() => {
    if (player && !activePiece) {
      dispatch(addPieceIndex());
      dispatch(addNewActivePiece(player.pieces[pieceIndex ? pieceIndex : 0]));
    }
  }, [player, dispatch, activePiece, pieceIndex]);

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
          <NextPieces
            nextPieces={player.pieces.slice(pieceIndex)}
            style={{ maxHeight: '100vh' }}
          />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Root>
  );
};
