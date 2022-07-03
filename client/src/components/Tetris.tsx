import React, { useEffect } from 'react';
import { Board } from './Board';
import NextPieces from './NextPieces';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks';
import params from '../params';
import { addNewActivePiece, addPieceIndex } from '../actions/client';
import { clientUpdateState } from '../actions/server';
import { PlayerObject } from '../reducers/types';
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
  allPlayers,
  playerPieces,
}: {
  player: PlayerObject;
  allPlayers: PlayerObject[];
  playerPieces: PieceName[];
}) => {
  const newPlayersList = [...allPlayers];
  const playerIndex = newPlayersList.findIndex(
    (playerFromList) => playerFromList.name === player.name
  );
  newPlayersList[playerIndex].pieces = [...playerPieces].slice(1);
  console.log('newPlayersList', newPlayersList);
  return { players: newPlayersList };
};

export const Tetris = () => {
  const dispatch = useAppDispatch();
  const player = useAppSelector(
    ({ state, player: { playerName: clientName } }) =>
      state.players.find(
        (playerFromServer) => playerFromServer.name === clientName
      )
  );
  const activePiece = useAppSelector((state) => state.piece.activePiece);
  const allPlayers = useAppSelector((state) => state.state.players);

  // const pieceIndex = useAppSelector((state) => state.player.pieceIndex);

  useEffect(() => {
    if (player && !activePiece) {
      // dispatch(addPieceIndex());
      dispatch(addNewActivePiece(player.pieces[0]));
      dispatch(
        clientUpdateState(
          updateClientPieces({
            player,
            allPlayers,
            playerPieces: player.pieces,
          })
        )
      );

      // dispatch(addNewActivePiece(player.pieces[pieceIndex ? pieceIndex : 0]));
    }
  }, [player, dispatch, activePiece, allPlayers]);

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
            // nextPieces={player.pieces.slice(pieceIndex)}
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
