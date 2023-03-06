import React from 'react';
import { Dispatch } from 'redux';
import styled from 'styled-components';

import { addNewActivePiece } from '../actions/client';
import { clientUpdateState, endGame } from '../actions/server';
import { Tetris } from '../components/Tetris';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Board, Piece, Player } from '../reducers/types';
import { spliceArraytoArray } from '../utils';

const Root = styled.div``;

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

const Game = () => {
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

  if (!!player && !activePiece && player.state === 'playing') {
    nextActivePiece({ previousPiece, player, dispatch });
  }

  return (
    <Root>
      <Tetris activePiece={activePiece} opponents={opponents} player={player} />
    </Root>
  );
};

export default Game;
