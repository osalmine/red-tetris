import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { resetGame } from '../actions/server';
import RedTetrisTitle from '../components/RedTetrisTitle';
import { useAppDispatch, useAppSelector } from '../hooks';
import SubmitButton from '../components/SubmitButton';

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Heading = styled.h2`
  font-size: 36px;
  margin: 0;
`;

const ScoreBoard = styled.div`
  margin: 24px;
`;

const ScoreLine = styled.p`
  margin: 4px;
  font-size: 18px;
`;

const Finished = () => {
  const dispatch = useAppDispatch();

  const players = useAppSelector((state) => state.state.players);
  const { playerName: clientName, roomName } = useAppSelector(
    (state) => state.player
  );
  const finishedPlayers = useAppSelector(({ state }) => state.finishedPlayers);
  const [playerIsAdmin, setPlayerIsAdmin] = useState<boolean>(false);

  useEffect(
    () =>
      setPlayerIsAdmin(
        players.find((player) => player.name === clientName)?.isAdmin ?? false
      ),
    [players, clientName]
  );

  const onResetGame = () => {
    if (clientName && roomName) {
      dispatch(resetGame({ playerName: clientName, roomName }));
    }
  };

  return (
    <Root>
      <RedTetrisTitle />
      <Heading>Game finished in room {roomName}</Heading>
      <ScoreBoard>
        {finishedPlayers.map((player, i) => (
          <ScoreLine key={`${i}_${player.name}`}>
            {i + 1}: {player.name}
          </ScoreLine>
        ))}
      </ScoreBoard>
      {playerIsAdmin && (
        <SubmitButton onClick={onResetGame}>Main menu</SubmitButton>
      )}
    </Root>
  );
};

export default Finished;
