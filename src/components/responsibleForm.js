import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useParams, useHistory } from 'react-router-dom'

import {
  getResponsible,
  createResponsible,
  editResponsible,
} from '../util/requests'

import FormInput from '../components/formInput'
import { MenuIcon } from '../util/icons'
import DefaultButton from './defaultButton'

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
`

const StyledTitle = styled.h2`
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  margin: 1rem;
`

const StyledMenuLink = styled(Link)`
  float: right;
  color: #302f2f;
  margin: 1rem;

  &:hover {
    transition: all 150ms linear;
    opacity: 0.75;
  }

  &:active {
    transition: all 150ms linear;
    opacity: 0.65;
  }
`

const StyledMenuIcon = styled(MenuIcon)`
  width: 2rem;
`

const StyledForm = styled.div`
  margin: 1rem;
  padding-top: 1rem;
  background-color: #fff;
  box-shadow: 2px 2px 2px #d0d0d0;
  border-radius: 3px;
`

const StyledFormGroup = styled.div`
  display: flex;
`

const StyledFormInput = styled(FormInput)`
  flex: 1;
  margin: 1rem;
`

const StyledError = styled.div`
  position: relative;
  background-color: #fae3e3;
  font-family: 'Roboto', sans-serif;
  border: 1px solid #ed143d;
  margin: 0 1rem;
  padding: 1rem;
  min-width: 0px;
  min-height: 0px;
  transition: all 500ms;
  box-shadow: 2px 2px 2px #d0d0d0;
  border-radius: 3px;

  &::before {
    content: '';
    position: absolute;
    top: -9px;
    left: 50px;
    width: 15px;
    height: 15px;
    background-color: #fae3e3;
    border-top: 1px solid #ed143d;
    border-left: 1px solid #ed143d;
    transform: rotate(45deg);
  }
`

const StyledDefaultButton = styled(DefaultButton)`
  display: inline-block;
  margin: 1rem;
`

// ResponsibleForm Component
const ResponsibleForm = () => {
  let { responsableId } = useParams()
  let history = useHistory()

  const [responsible, setResponsible] = useState({})

  const {
    id,
    nome = '',
    email = '',
    cpf = '',
    data_nascimento = '',
  } = responsible

  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (responsableId) {
      const callGetResponsible = async () => {
        let { status, data } = await getResponsible(responsableId)
        if (status === 200) {
          if (data) {
            if (!data.data_nascimento) {
              delete data.data_nascimento
            } else {
              const [year, month, day] = data.data_nascimento
              data.data_nascimento = new Date(year, month, day)
            }
            setResponsible(data)
          } else {
            history.push('/responsible')
          }
        }
      }
      callGetResponsible()
    }
  }, [history, responsableId])

  const onChangeFormField = e => {
    setResponsible({
      ...responsible,
      [e.target.id]: e.target.value,
    })
  }

  const onChangeBornDate = e => {
    setResponsible({
      ...responsible,
      data_nascimento: e,
    })
  }

  const submmitForm = async () => {
    setErrors([])
    let res
    if (id) {
      res = await editResponsible(responsible).catch(
        error => (res = error.response)
      )
    } else {
      res = await createResponsible(responsible).catch(
        error => (res = error.response)
      )
    }

    const {
      status,
      data,
      headers: { location },
    } = res

    if (status === 201) {
      history.push(
        `/responsible/edit/${location.substr(location.lastIndexOf('/') + 1)}`
      )
    } else if (status === 412) {
      setErrors(data)
    } else {
      setErrors([{ mensagem: 'Erro inesperado' }])
    }
  }

  return (
    <StyledWrapper>
      <StyledTitle>Cadastro de responsável</StyledTitle>
      <StyledMenuLink to="/responsible" title="Voltar a lista">
        <StyledMenuIcon />
      </StyledMenuLink>
      <StyledForm>
        <StyledFormGroup>
          <StyledFormInput
            inputLabel="Nome"
            value={nome}
            onChange={onChangeFormField}
            id="nome"
          />
          <StyledFormInput
            inputLabel="E-mail"
            value={email}
            onChange={onChangeFormField}
            id="email"
          />
        </StyledFormGroup>
        <StyledFormGroup>
          <StyledFormInput
            inputLabel="CPF"
            value={cpf}
            onChange={onChangeFormField}
            id="cpf"
            mask="999.999.999-99"
          />
          <StyledFormInput
            inputLabel="Data de nascimento"
            value={data_nascimento}
            onChange={onChangeBornDate}
            id="data_nascimento"
            type="date"
          />
        </StyledFormGroup>
        <StyledDefaultButton onClick={submmitForm}>
          {id ? 'Editar' : 'Cadastrar'}
        </StyledDefaultButton>
      </StyledForm>
      {errors.length > 0 && (
        <StyledError>
          {errors.map((error, index) => (
            <p key={`error_${index}`}>{error.mensagem}</p>
          ))}
        </StyledError>
      )}
    </StyledWrapper>
  )
}

export default ResponsibleForm
