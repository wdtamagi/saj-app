import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  background-color: ${({ theme: { primary } }) => primary};
  color: #fff;
  padding: 0.8rem;
  border-radius: 3px;
  justify-self: center;
  align-self: center;
  transition: all 200ms;
  user-select: none;
  cursor: pointer;

  &:hover {
    transition: all 150ms linear;
    opacity: 0.85;
  }

  &:active {
    transition: all 150ms linear;
    opacity: 0.75;
  }
`

const DefaultButton = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
)

export default DefaultButton
