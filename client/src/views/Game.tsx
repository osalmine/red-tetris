import React, { useEffect } from 'react';

import { Tetris } from '../components/Tetris';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateBoard } from '../utils';

const Game = () => {
  const dispatch = useAppDispatch();
  const player = useAppSelector(({ state, player: { playerName: clientName } }) =>
    state.players.find(playerFromServer => playerFromServer.name === clientName),
  );
  const opponents = useAppSelector(({ state, player: { playerName: clientName } }) =>
    state.players.filter(playerFromServer => playerFromServer.name !== clientName),
  );
  const { activePiece, previousPiece, nextPieceType } = useAppSelector(state => state.piece);

  useEffect(() => {
    if (!!player && !activePiece && !nextPieceType && player.state === 'playing') {
      updateBoard({ previousPiece, player, dispatch });
    }
  }, [activePiece, dispatch, nextPieceType, player, previousPiece]);

  return <Tetris activePiece={activePiece} opponents={opponents} player={player} />;
};

export default Game;
