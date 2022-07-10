import React, { useMemo } from 'react';
import { Board } from './Board';
import NextPieces from './NextPieces';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addNewActivePiece } from '../actions/client';
import { clientUpdateState } from '../actions/server';
import { Player } from '../reducers/types';
import { PieceName } from '../constants/pieces';

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

const updateClientPieces = ({
  player,
  playerPieces,
}: {
  player: Player;
  playerPieces: PieceName[];
}): Player => ({ ...player, pieces: [...playerPieces].slice(1) });

export const Tetris = () => {
  const dispatch = useAppDispatch();
  const player = useAppSelector(
    ({ state, player: { playerName: clientName } }) =>
      state.players.find(
        (playerFromServer) => playerFromServer.name === clientName
      )
  );
  const activePiece = useAppSelector((state) => state.piece.activePiece);

  const boardCols = useMemo(
    () => player?.board.field[0].length || 0,
    [player?.board.field]
  );
  const boardRows = useMemo(
    () => player?.board.field.length || 0,
    [player?.board.field]
  );

  if (player && !activePiece) {
    dispatch(addNewActivePiece(player.pieces[0]));
    dispatch(
      clientUpdateState(
        updateClientPieces({
          player,
          playerPieces: player.pieces,
        })
      )
    );
  }

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
              cols={boardCols}
              rows={boardRows}
            />
          )}
          <NextPieces
            nextPieces={player.pieces}
            style={{ maxHeight: '100vh' }}
          />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Root>
  );
};
