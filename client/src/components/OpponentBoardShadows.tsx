import React from 'react';
import styled from 'styled-components';

import { Player } from '../types';
import { ShadowBoard } from './ShadowBoard';

type Props = {
  opponents: Player[];
};

const Root = styled.div`
  display: flex;
  justify-content: center;
  > div + div {
    margin-left: 32px;
  }

  @media (max-height: 967px) {
    margin-left: 16px;
    width: 20%;
  }
`;

const OpponentBoardShadows = ({ opponents }: Props) => (
  <Root>
    {opponents.map((opponent, i) => (
      <ShadowBoard
        boardValues={opponent.board.field}
        cols={10}
        isGameOver={opponent.state === 'finished'}
        key={`${opponent.name}_${i}`}
        name={opponent.name}
        rows={20}
      />
    ))}
  </Root>
);

export default OpponentBoardShadows;
