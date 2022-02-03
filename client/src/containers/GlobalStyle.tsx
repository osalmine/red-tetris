import React from 'react';
import { createGlobalStyle } from 'styled-components';

type Props = {
  children: React.ReactNode;
};

export const theme = {
  black: '#202124',
  red: '#FF0035',
  green: '#4D8B31',
  grey: '#848FA5',
  white: '#FFFFFF',
};

const BodyStyle = createGlobalStyle`
  body {
    background-color: ${theme.black};
    color: ${theme.white};
    font-family: 'Roboto', sans-serif;
  }
`;

const GlobalStyle = ({ children }: Props) => (
  <>
    <BodyStyle/>
    {children}
  </>
);

export default GlobalStyle;
