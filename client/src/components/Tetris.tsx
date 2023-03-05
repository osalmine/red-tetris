import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Dispatch } from 'redux';

import { PlayerBoard } from './PlayerBoard';
import NextPieces from './NextPieces';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addNewActivePiece } from '../actions/client';
import { clientUpdateState, endGame } from '../actions/server';
import { Piece, Board, Player } from '../reducers/types';
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
  board: Board;
}): Board => {
  const newBoard = JSON.parse(JSON.stringify(board));

  let j = 0;
  for (
    let i = previousPiece.pieceYOffset;
    i < previousPiece.pieceYOffset + previousPiece.values.length &&
    i < newBoard.field.length;
    i++
  ) {
    newBoard.field[i] = spliceArraytoArray({
      start: previousPiece.pieceXOffset,
      targetArray: [...newBoard.field[i]],
      arrayToInsert: [...previousPiece.values[j]],
      ignoreInSplice: 0,
    });
    j++;
  }
  return { ...newBoard, isOverflown: previousPiece.pieceYOffset <= 0 };
};

const nextActivePiece = ({
  previousPiece,
  player,
  dispatch,
}: {
  previousPiece: Piece | undefined;
  player: Player;
  dispatch: Dispatch;
}) => {
  if (previousPiece && previousPiece?.pieceYOffset < 0) {
    dispatch(endGame({ roomName: player.roomName, playerName: player.name }));
  } else {
    const newBoard = previousPiece
      ? updateClientBoard({ previousPiece, board: player.board })
      : null;
    dispatch(addNewActivePiece(player.pieces[0]));
    dispatch(
      clientUpdateState({
        ...player,
        pieces: [...player.pieces].slice(1),
        board: newBoard ?? player.board,
      })
    );
  }
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

  if (!!player && !activePiece && player.state === 'playing') {
    nextActivePiece({ previousPiece, player, dispatch });
  }

  return (
    <Root>
      <OpponentBoardShadows opponents={opponents} />
      {player ? (
        <PlayerView>
          {player.state === 'finished' ? (
            <>Game Ended</>
          ) : (
            <>
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
            </>
          )}
        </PlayerView>
      ) : (
        <div>Loading...</div>
      )}
    </Root>
  );
};
