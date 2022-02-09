import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
};

const RowContainer = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
`;

const Cell = ({ children }: Props) => <RowContainer>{children}</RowContainer>;

export default Cell;
