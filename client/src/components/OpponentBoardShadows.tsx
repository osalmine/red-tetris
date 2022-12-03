import React from 'react';
import styled from 'styled-components';
import { Player } from '../reducers/types';
import { ShadowBoard } from './ShadowBoard';

type Props = {
  opponents: Player[];
};

const Root = styled.div`
  display: flex;
`;

const OpponentBoardShadows = ({ opponents }: Props) => (
  <Root>
    {opponents.map((opponent, i) => (
      <ShadowBoard
        boardValues={opponent.board.field}
        cols={10}
        key={`${opponent.name}_${i}`}
        rows={20}
      />
    ))}
  </Root>
);

export default OpponentBoardShadows;
