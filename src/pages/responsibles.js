import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import {
  allResponsibles,
  removeResponsible,
  createResponsible,
  editResponsible,
} from '../util/requests'

import { AddIcon } from '../util/icons'
import ResponsibleForm from '../components/responsibleForm'
import FormInput from '../components/formInput'

const StyledWrapper = styled.div`
  position: relative;
`

const StyledTitle = styled.h2`
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  margin: 1rem;
`

const StyledFilterWrapper = styled.div`
  margin: 1rem;
  padding: 2rem;
  background-color: #fff;
`

const StyledFormInput = styled(FormInput)`
  display: inline-block;
  margin: 1rem;
`

const StyledSplit = styled.div`
  width: 100%;
  height: 1px;
  margin: 1rem 0;
  border-bottom: 1px dashed black;
`

const StyledListWrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  margin: 1rem;
  background-color: #fff;
`

const StyledNoRecords = styled.p`
  text-align: center;
  padding: 2rem;
`

const Responsibles = () => {
  const [responsibles, setResponsibles] = useState([])
  const [filter, setFilter] = useState({
    nome: '',
    email: '',
    cpf: '',
  })
  const [filtered, setFiltered] = useState({
    nome: '',
    email: '',
    cpf: '',
  })
  const [page, setPage] = useState(0)

  useEffect(() => {
    const callAllResponsibles = async () => {
      const {
        status,
        data: { records = [], records_number },
      } = await allResponsibles({ ...filtered, page })

      if (status === 200) {
        setResponsibles(records)
      }
    }

    callAllResponsibles()
  }, [filtered, page])

  const [openForm, setOpenForm] = useState(false)

  const onChangeFilterField = e => {
    setFilter({ ...filter, [e.target.id]: e.target.value })
  }

  const submmitFilter = e => {
    setFiltered(filter)
  }

  const openFormHandler = e => {
    setOpenForm(true)
  }

  const closeFormHandler = e => {
    setOpenForm(false)
  }

  return (
    <StyledWrapper>
      <StyledTitle>Consulta de responsáveis</StyledTitle>
      <button onClick={openFormHandler}>Add</button>
      <StyledFilterWrapper>
        <StyledFormInput
          inputLabel="Nome"
          value={filter.nome}
          onChange={onChangeFilterField}
          id="nome"
        />
        <StyledFormInput
          inputLabel="E-mail"
          value={filter.email}
          onChange={onChangeFilterField}
          id="email"
        />
        <StyledFormInput
          inputLabel="CPF"
          value={filter.cpf}
          onChange={onChangeFilterField}
          id="cpf"
        />
        <button onClick={submmitFilter}>Consultar</button>
      </StyledFilterWrapper>

      <StyledSplit />

      <StyledListWrapper>
        {responsibles.length === 0 && (
          <StyledNoRecords>
            Não existe resultado para consulta executada
          </StyledNoRecords>
        )}
        {responsibles.length > 0 &&
          responsibles.map(responsible => <div>{responsible.nome}</div>)}
      </StyledListWrapper>

      {openForm && <ResponsibleForm />}
    </StyledWrapper>
  )
}

export default Responsibles
