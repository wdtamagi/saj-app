import React from 'react'
import styled from 'styled-components'

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

const StyledLabel = styled.label`
  position: absolute;
  top: 0;
  display: block;
  color: #585858;
  transition: 300ms all;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 90%;

  ${({ value }) =>
    value &&
    value != '' &&
    `
    font-size: 75%;
    transform: translate3d(0, -100%, 0);
  `}
`

const StyledWrapper = styled.div`
  position: relative;
`

export default class FormInput extends React.Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
    this.focusTextInput = this.focusTextInput.bind(this)
  }

  componentDidMount() {
    if (this.props.focusOnStart) {
      this.textInput.current.focus()
    }
  }

  focusTextInput() {
    this.textInput.current.focus()
  }

  render() {
    let { className, inputLabel, value, onChange, id } = this.props
    return (
      <StyledWrapper className={className}>
        <StyledInput
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          ref={this.textInput}
        />
        <StyledLabel value={value} onClick={this.focusTextInput}>
          {inputLabel}
        </StyledLabel>
      </StyledWrapper>
    )
  }
}
// export default compose(
// )(FormInput)
