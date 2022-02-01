import React from 'react';
import { createGlobalStyle } from 'styled-components';

type Props = {
  children: React.ReactNode;
};

const BodyStyle = createGlobalStyle`
  body {
    background-color: #202124;
    color: #FFFFFF;
  }
`;

const GlobalStyle = ({ children }: Props) => (
  <>
    <BodyStyle/>
    {children}
  </>
);

export default GlobalStyle;
