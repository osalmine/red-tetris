import React from 'react';
import styled from 'styled-components';

import { GlobalColorProps } from '../containers/GlobalStyle';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  color?: GlobalColorProps;
};

type StartGameProps = {
  btnColor?: GlobalColorProps;
};

const StartGame = styled.button.attrs(() => ({
  type: 'submit',
}))<StartGameProps>`
  background: ${(props) => props.btnColor || props.theme.green};
  border: 1px solid ${(props) => props.btnColor || props.theme.green};
  border-radius: 6px;
  box-sizing: border-box;
  color: ${(props) => props.theme.white};
  cursor: pointer;
  display: inline-block;
  font-size: 22px;
  line-height: 16px;
  min-height: 40px;
  outline: 0;
  padding: 16px 18px;
  text-align: center;
  user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  margin-bottom: 10px;

  &:hover,
  &:active {
    background-color: initial;
    background-position: 0 0;
    color: ${(props) => props.btnColor || props.theme.green};
  }

  &:active {
    opacity: 0.5;
  }
`;

const Button = ({ children, onClick, color }: Props) => (
  <StartGame btnColor={color} onClick={onClick}>
    {children}
  </StartGame>
);

export default Button;
