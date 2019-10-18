import React, { useState } from 'react'
import styled from 'styled-components'
import InputMask from 'react-input-mask'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import './formInput.css'

const StyledInput = styled.input`
  display: block;
  background: transparent;
  outline: none;
  width: 100%;
  border: none;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #585858;
  transition: 300ms all;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 100%;

  &:focus {
    border-bottom-color: #0187ff;
  }

  &:focus + ${() => StyledLabel} {
    color: #0187ff;
    font-size: 75%;
    transform: translate3d(0, -100%, 0);
  }
`

const StyledInputMask = styled(InputMask)`
  display: block;
  background: transparent;
  outline: none;
  width: 100%;
  border: none;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #585858;
  transition: 300ms all;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 100%;

  &:focus {
    border-bottom-color: #0187ff;
  }
`

const StyledDatePicker = styled(DatePicker)`
  display: block;
  background: transparent;
  outline: none;
  width: 100%;
  border: none;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #585858;
  transition: 300ms all;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 100%;

  &:focus {
    border-bottom-color: #0187ff;
  }

  &:focus + ${({ id }) => `#label_${id}`} {
    color: #0187ff;
    font-size: 75%;
    transform: translate3d(0, -100%, 0);
  }
`

const StyledLabel = styled.label`
  position: absolute;
  top: 0;
  display: block;
  color: #585858;
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

  ${({ focused }) =>
    focused &&
    `    color: #0187ff;
    font-size: 75%;
    transform: translate3d(0, -100%, 0);`}
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
          guide={false}
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
