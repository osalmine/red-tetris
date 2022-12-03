import React, { useMemo } from 'react';
import styled from 'styled-components';

import { PlayerBoard } from './PlayerBoard';
import NextPieces from './NextPieces';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addNewActivePiece } from '../actions/client';
import { clientUpdateState } from '../actions/server';
import { Piece, BoardValues } from '../reducers/types';
import OpponentBoardShadows from './OpponentBoardShadows';

const Root = styled.div`
  display: flex;
  flex: initial;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const PlayerView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`;

const InvinsibleBalancePiece = styled.div`
  visibility: hidden;
  height: 0;
`;

// eslint-disable-next-line comma-spacing
const spliceArraytoArray = <T,>({
  start,
  targetArray,
  arrayToInsert,
  ignoreInSplice,
}: {
  start: number;
  targetArray: T[];
  arrayToInsert: T[];
  ignoreInSplice?: T;
}) => {
  const insertLength = arrayToInsert.length;

  for (let i = start; i < start + insertLength; i++) {
    if (arrayToInsert[i - start] !== ignoreInSplice) {
      targetArray[i] = arrayToInsert[i - start];
    }
  }
  return targetArray;
};

const updateClientBoard = ({
  previousPiece,
  board,
}: {
  previousPiece: Piece;
  board: BoardValues;
}) => {
  const newBoard = [...board.field];

  let j = 0;
  for (
    let i = previousPiece.pieceYOffset;
    i < previousPiece.pieceYOffset + previousPiece.values.length &&
    i < newBoard.length;
    i++
  ) {
    newBoard[i] = spliceArraytoArray({
      start: previousPiece.pieceXOffset,
      targetArray: [...newBoard[i]],
      arrayToInsert: [...previousPiece.values[j]],
      ignoreInSplice: 0,
    });
    j++;
  }
  return newBoard;
};

export const Tetris = () => {
  const dispatch = useAppDispatch();
  const player = useAppSelector(
    ({ state, player: { playerName: clientName } }) =>
      state.players.find(
        (playerFromServer) => playerFromServer.name === clientName
      )
  );
  const opponents = useAppSelector(
    ({ state, player: { playerName: clientName } }) =>
      state.players.filter(
        (playerFromServer) => playerFromServer.name !== clientName
      )
  );
  const { activePiece, previousPiece } = useAppSelector((state) => state.piece);

  const boardCols = useMemo(
    () => player?.board.field[0].length || 0,
    [player?.board.field]
  );
  const boardRows = useMemo(
    () => player?.board.field.length || 0,
    [player?.board.field]
  );

  if (player && !activePiece) {
    const newFieldValues = previousPiece
      ? updateClientBoard({ previousPiece, board: player.board })
      : null;
    dispatch(addNewActivePiece(player.pieces[0]));
    dispatch(
      clientUpdateState({
        ...player,
        pieces: [...player.pieces].slice(1),
        board: {
          field: newFieldValues ?? player.board.field,
        },
      })
    );
  }

  console.log('opponents', opponents);

  return (
    <Root>
      <OpponentBoardShadows opponents={opponents} />
      {player ? (
        <PlayerView>
          {/* <InvinsibleBalancePiece> */}
          {/* <NextPieces nextPieces={player.pieces} /> */}
          {/* </InvinsibleBalancePiece> */}
          {activePiece && (
            <PlayerBoard
              activePiece={activePiece}
              boardValues={player.board.field}
              cols={boardCols}
              rows={boardRows}
            />
          )}
          <NextPieces
            nextPieces={player.pieces}
            style={{ maxHeight: '100vh' }}
          />
        </PlayerView>
      ) : (
        <div>Loading...</div>
      )}
    </Root>
  );
};
