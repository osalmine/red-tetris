import React, { useMemo } from 'react';
import styled from 'styled-components';

import { PlayerBoard } from './PlayerBoard';
import NextPieces from './NextPieces';
import { Piece, Player } from '../types';
import OpponentBoardShadows from './OpponentBoardShadows';

type Props = {
  player?: Player;
  opponents: Player[];
  activePiece?: Piece | null;
};

const Root = styled.div`
  display: flex;
  flex: initial;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 100vh;
`;

const PlayerView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  /* width: 100%; */
  @media (max-height: 967px) {
    width: calc(100% - 20% - 24px);
  }
`;

const GameEnded = styled.div`
  font-size: 5rem;
  margin-top: 10rem;
`;

export const Tetris = ({ player, opponents, activePiece }: Props) => {
  const boardCols = useMemo(() => player?.board.field[0].length || 0, [player?.board.field]);
  const boardRows = useMemo(() => player?.board.field.length || 0, [player?.board.field]);
  return (
    <Root>
      {opponents.length > 0 && <OpponentBoardShadows opponents={opponents} />}
      {player ? (
        <PlayerView>
          {player.state === 'finished' ? (
            <GameEnded>Game Ended</GameEnded>
          ) : (
            <>
              <PlayerBoard
                activePiece={activePiece}
                boardValues={player.board.field}
                cols={boardCols}
                rows={boardRows}
              />
              <NextPieces nextPieces={player.pieces} style={{ maxHeight: '100vh' }} />
            </>
          )}
        </PlayerView>
      ) : (
        <div>Loading...</div>
      )}
    </Root>
  );
};
