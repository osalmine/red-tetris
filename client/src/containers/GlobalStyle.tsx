import React from 'react';
import { createGlobalStyle } from 'styled-components';

type Props = {
  children: React.ReactNode;
};

type GlobalColorProps = 'black' | 'red' | 'green' | 'grey' | 'white';

const globalColorTheme: {[K in GlobalColorProps]: string } = {
  black: '#202124',
  red: '#FF0035',
  green: '#4D8B31',
  grey: '#848FA5',
  white: '#FFFFFF',
};

const BodyStyle = createGlobalStyle`
  body {
    background-color: ${globalColorTheme.black};
    color: ${globalColorTheme.white};
    font-family: 'Roboto', sans-serif;
  }

  button {
    font-family: 'Roboto', sans-serif;
  }
`;

const GlobalStyle = ({ children }: Props) => (
  <>
    <BodyStyle/>
    {children}
  </>
);

export { type GlobalColorProps, globalColorTheme };
export default GlobalStyle;
