import React, { useMemo } from 'react';
import { Board } from './Board';
import NextPieces from './NextPieces';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addNewActivePiece } from '../actions/client';
import { clientUpdateState } from '../actions/server';
import { Player, Piece, BoardValues } from '../reducers/types';
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

// eslint-disable-next-line comma-spacing
const spliceArraytoArray = <T,>(
  start: number,
  targetArray: T[],
  arrayToInsert: T[]
) => {
  const insertLength = arrayToInsert.length;

  console.log('start', start);
  console.log('insertLength', insertLength);
  console.log('TARGET ARRAY', targetArray);
  console.log('INSERT ARRAY', arrayToInsert);
  console.log('start + insertLength', start + insertLength);
  for (let i = start; i < start + insertLength; i++) {
    // console.log('i', i);
    // targetArray.splice(i, 1, arrayToInsert[i]);
    targetArray[i] = arrayToInsert[i - start];
  }
  console.log('FINISHED TARGET ARRAY', targetArray);
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
  console.log('newBoard', newBoard);

  let j = 0;
  for (
    let i = previousPiece.pieceYOffset;
    i < previousPiece.pieceYOffset + previousPiece.values.length;
    i++
  ) {
    // newBoard[i].splice(
    //   previousPiece.pieceXOffset,
    //   previousPiece.values.length,
    //   previousPiece.values[j]
    // );
    newBoard[i] = spliceArraytoArray(
      previousPiece.pieceXOffset,
      newBoard[i],
      previousPiece.values[j]
    );
    // newBoard[previousPiece.pieceXOffset + i] = previousPiece.values[j];
    j++;
  }
  console.log('newBoard AFTER', newBoard);
};

export const Tetris = () => {
  const dispatch = useAppDispatch();
  const player = useAppSelector(
    ({ state, player: { playerName: clientName } }) =>
      state.players.find(
        (playerFromServer) => playerFromServer.name === clientName
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

  // if (
  //   activePiece &&
  //   !pieceCanMoveDown({
  //     pieceYOffset: activePiece?.pieceYOffset,
  //     pieceValues: activePiece?.values,
  //   })
  // ) {
  //   console.log('PIECE ABOUT TO HIT BOTTOM');
  // }
  if (player && !activePiece) {
    console.log('previousPiece', previousPiece);
    if (previousPiece) {
      updateClientBoard({ previousPiece, board: player.board });
    }
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
            {/* <NextPieces nextPieces={player.pieces} /> */}
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
