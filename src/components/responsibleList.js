import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import {
  allResponsibles,
  removeResponsible,
  createResponsible,
  editResponsible,
} from '../util/requests'

import { AddIcon } from '../util/icons'
import ResponsibleForm from './responsibleForm'
import FormInput from './formInput'

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

const StyledListItemWrapper = styled.div`
  display: flex;
  background-color: #fff;
`

const StyledListItemGroup = styled.div`
  display: flex;
  flex: 1;
`
const StyledListItemFieldWrapper = styled.div``

const StyledListItemField = styled.div``

const StyledListItemActionWrapper = styled.div``

const StyledPagination = styled.div`
  text-align: right;
  margin: 1rem;
`
const StyledPaginationButton = styled.button`
  ${({ selected }) => selected && 'background-color: #fff;'}
`

// ResponsibleList Component
const ResponsibleList = () => {
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
  const [pageArr, setPageArr] = useState([])
  const [records, setRecords] = useState(0)

  const getPageArray = useCallback(() => {
    const pages = Math.ceil(records / 10)
    let arr = [1, 2, 3, 4, 5]
    if (pages < 5) {
      arr.length = pages
    } else {
      if (page > 3 || page < pages - 2) {
        arr[0] = page - 2
        arr[1] = page - 1
        arr[2] = page
        arr[3] = page + 1
        arr[4] = page + 2
      }
    }
    setPageArr(arr)
  }, [page, records])

  useEffect(() => {
    const callAllResponsibles = async () => {
      const {
        status,
        data: { records = [], records_number },
      } = await allResponsibles({ ...filtered, page })

      if (status === 200) {
        setResponsibles(records)
        setRecords(records_number)
        getPageArray()
      }
    }

    callAllResponsibles()
  }, [filtered, getPageArray, page])

  const onChangeFilterField = e => {
    setFilter({ ...filter, [e.target.id]: e.target.value })
  }

  const submmitFilter = () => {
    setPage(0)
    setFiltered(filter)
  }

  const removeResponsibleHandler = async id => {
    const { status } = await removeResponsible(id)
    if (status === 200) {
      updateResponsibles()
    }
  }

  const updateResponsibles = async () => {
    const {
      status,
      data: { records = [], records_number },
    } = await allResponsibles({ ...filtered, page })

    if (status === 200) {
      setResponsibles(records)
      setRecords(records_number)
      getPageArray()
    }
  }

  return (
    <StyledWrapper>
      <StyledTitle>Consulta de responsáveis</StyledTitle>
      <Link to="/responsible/new">Add</Link>
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
          responsibles.map(({ id, nome, email, cpf, data_nascimento }) => (
            <StyledListItemWrapper key={`responsible_${id}`}>
              <StyledListItemGroup>
                <StyledListItemFieldWrapper>
                  <StyledListItemField>{nome}</StyledListItemField>
                  <StyledListItemField>{email}</StyledListItemField>
                </StyledListItemFieldWrapper>
                <StyledListItemFieldWrapper>
                  <StyledListItemField>{cpf}</StyledListItemField>
                  <StyledListItemField>{data_nascimento}</StyledListItemField>
                </StyledListItemFieldWrapper>
              </StyledListItemGroup>
              <StyledListItemActionWrapper>
                <Link to={`/responsible/edit/${id}`}>edit</Link>
                <button onClick={() => removeResponsibleHandler(id)}>
                  remove
                </button>
              </StyledListItemActionWrapper>
            </StyledListItemWrapper>
          ))}
        {pageArr.length > 1 && (
          <StyledPagination>
            <button onClick={() => setPage(0)}>{'|<'}</button>
            <button onClick={() => page > 0 && setPage(page - 1)}>{'<'}</button>
            {pageArr.map(element => (
              <StyledPaginationButton
                key={`pag_button_${element}`}
                selected={page === element - 1}
                onClick={() => setPage(element - 1)}
              >
                {element}
              </StyledPaginationButton>
            ))}
            <button
              onClick={() =>
                page < Math.ceil(records / 10) - 1 && setPage(page + 1)
              }
            >
              {'>'}
            </button>
            <button onClick={() => setPage(Math.ceil(records / 10) - 1)}>
              {'>|'}
            </button>
          </StyledPagination>
        )}
      </StyledListWrapper>
    </StyledWrapper>
  )
}

export default ResponsibleList
