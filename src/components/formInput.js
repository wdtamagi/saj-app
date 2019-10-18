import React, { useState } from 'react'
import styled from 'styled-components'
import InputMask from 'react-input-mask'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import './formInput.css'

const inputStyle = `
  display: block;
  background: transparent;
  outline: none;
  width: 100%;
  border: none;
  border-bottom-width: 2px;
  border-bottom-style: solid;  
  transition: 300ms all;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 100%;  
`

const StyledInput = styled.input`
  ${inputStyle}
  border-bottom-color: ${({ theme: { fakeBlack } }) => fakeBlack};

  &:focus {
    border-bottom-color: ${({ theme: { primary } }) => primary};
  }
`

const StyledInputMask = styled(InputMask)`
  ${inputStyle}
  border-bottom-color: ${({ theme: { fakeBlack } }) => fakeBlack};

  &:focus {
    border-bottom-color: ${({ theme: { primary } }) => primary};
  }
`

const StyledDatePicker = styled(DatePicker)`
  ${inputStyle}
  border-bottom-color: ${({ theme: { fakeBlack } }) => fakeBlack};

  &:focus {
    border-bottom-color: ${({ theme: { primary } }) => primary};
  }
`

const StyledLabel = styled.label`
  position: absolute;
  top: 0;
  display: block;
  color: ${({ theme: { fakeBlack } }) => fakeBlack};
  transition: 300ms all;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 90%;
  pointer-events: none;

  ${({ value }) =>
    value &&
    value !== '' &&
    `
    font-size: 75%;
    transform: translate3d(0, -100%, 0);
  `}

  ${({ focused, theme: { primary } }) =>
    focused &&
    `
      color: ${primary};
      font-size: 75%;
      transform: translate3d(0, -100%, 0);
    `}
`

const StyledWrapper = styled.div`
  position: relative;
`

const FormInput = ({
  className,
  type = 'text',
  inputLabel,
  value,
  onChange,
  id,
  mask,
}) => {
  const [focused, setFocused] = useState(false)

  return (
    <StyledWrapper className={className}>
      {mask && (
        <StyledInputMask
          mask={mask}
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maskPlaceholder=""
        />
      )}
      {!mask && type !== 'date' && (
        <StyledInput
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
      {!mask && type === 'date' && (
        <StyledDatePicker
          dateFormat="dd/MM/yyyy"
          id={id}
          selected={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          filterDate={date => date < new Date()}
        />
      )}

      <StyledLabel id={`label_${id}`} value={value} focused={focused}>
        {inputLabel}
      </StyledLabel>
    </StyledWrapper>
  )
}

export default FormInput
