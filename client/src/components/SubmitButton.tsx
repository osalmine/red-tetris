import React from 'react';
import styled from 'styled-components';

import { GlobalColorProps } from '../containers/GlobalStyle';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  color?: GlobalColorProps;
};

const Button = styled.button.attrs(() => ({
  type: 'submit',
}))<{
  btnColor?: GlobalColorProps;
}>`
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

const SubmitButton = ({ children, onClick, color }: Props) => (
  <Button btnColor={color} onClick={onClick}>
    {children}
  </Button>
);

export default SubmitButton;
