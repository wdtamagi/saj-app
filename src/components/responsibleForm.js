import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import {
  getResponsible,
  createResponsible,
  editResponsible,
} from '../util/requests'

import FormInput from '../components/formInput'

const StyledWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
`

const StyledTitle = styled.h2`
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  margin: 1rem;
`

const StyledForm = styled.form``

const StyledFormInput = styled(FormInput)`
  display: inline-block;
  margin: 1rem;
`

const ResponsibleForm = ({ id }) => {
  const [responsible, setResponsible] = useState({})

  useEffect(() => {
    if (id) {
      const callGetResponsible = async () => {
        const { status, data } = await getResponsible(id)

        if (status === 200) {
          setResponsible(data)
        }
      }
      callGetResponsible()
    }
  }, [id])

  const onChangeFormField = e => {
    setResponsible({ ...responsible, [e.target.id]: e.target.value })
  }

  return (
    <StyledWrapper>
      <StyledTitle>Cadastro de responsável</StyledTitle>
      <StyledForm>
        <StyledFormInput
          inputLabel="Nome"
          value={responsible.nome}
          onChange={onChangeFormField}
          id="nome"
        />
        <StyledFormInput
          inputLabel="E-mail"
          value={responsible.email}
          onChange={onChangeFormField}
          id="email"
        />
        <StyledFormInput
          inputLabel="CPF"
          value={responsible.cpf}
          onChange={onChangeFormField}
          id="cpf"
        />
        <StyledFormInput
          inputLabel="Data de nascimento"
          value={responsible.data_nascimento}
          onChange={onChangeFormField}
          id="data_nascimento"
        />
      </StyledForm>
    </StyledWrapper>
  )
}

export default ResponsibleForm
