import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { allResponsibles, removeResponsible } from '../util/requests'

import { AddIcon, EditIcon, RemoveIcon } from '../util/icons'
import FormInput from './formInput'
import DefaultButton from './defaultButton'

const StyledWrapper = styled.div`
  position: relative;
`

const StyledTitle = styled.h2`
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  margin: 1rem;
  color: ${({ theme: { fakeBlack } }) => fakeBlack};
`

const StyledAddLink = styled(Link)`
  float: right;
  color: ${({ theme: { primary } }) => primary};
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

const StyledAddIcon = styled(AddIcon)`
  width: 2rem;
`

const StyledFilterWrapper = styled.div`
  display: flex;
  margin: 1rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 2px 2px 2px #d0d0d0;
`

const StyledFilterFieldsWrapper = styled.div`
  display: flex;
  flex: 1;
`

const StyledFilterField = styled(FormInput)`
  flex: 1;
  margin: 1rem;
`

const StyledSplit = styled.div`
  width: 100%;
  height: 1px;
  margin: 1rem 0;
  border-bottom: 2px dashed #302f2f;
  box-shadow: 2px 2px 2px #d0d0d0;
`

const StyledListWrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  margin: 1rem;
  color: ${({ theme: { fakeBlack } }) => fakeBlack};
`

const StyledNoRecords = styled.p`
  text-align: center;
  padding: 2rem;
`

const StyledListItemWrapper = styled.div`
  display: flex;
  background-color: #fff;
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  box-shadow: 2px 2px 2px #d0d0d0;

  &:hover {
    transition: all 150ms linear;
    background-color: #e8e8e8;
  }
`

const StyledListItemGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
const StyledListItemFieldWrapper = styled.div``

const StyledListItemField = styled.div`
  display: inline-block;
  margin: 0 0.5rem;
`

const StyledListItemFieldSplit = styled.div`
  display: inline-block;
`

const StyledListItemActionWrapper = styled.div`
  display: flex;
  align-items: center;
`

const StyledEditLink = styled(Link)`
  margin: 0 0.5rem;
  color: ${({ theme: { fakeBlack } }) => fakeBlack};

  &:hover {
    transition: all 150ms linear;
    color: #000bff;
  }

  &:active {
    transition: all 150ms linear;
    opacity: 0.75;
  }
`
const StyledEditIcon = styled(EditIcon)`
  width: 1.5rem;
`

const StyledRemoveLink = styled.a`
  margin: 0 0.5rem;
  cursor: pointer;
  color: ${({ theme: { fakeBlack } }) => fakeBlack};

  &:hover {
    transition: all 150ms linear;
    color: ${({ theme: { danger } }) => danger};
  }

  &:active {
    transition: all 150ms linear;
    opacity: 0.75;
  }
`
const StyledRemoveIcon = styled(RemoveIcon)`
  width: 1.5rem;
`

const StyledPagination = styled.div`
  text-align: right;
  margin: 1rem 0;
`
const StyledPaginationButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  background-color: #fff;
  color: ${({ theme: { fakeBlack } }) => fakeBlack};
  border: 1px solid ${({ theme: { fakeBlack } }) => fakeBlack};
  border-radius: 3px;
  width: 1rem;
  height: 1rem;
  padding: 0.2rem;
  margin-left: 0.2rem;
  box-shadow: 2px 2px 2px #d0d0d0;
  cursor: pointer;
  user-select: none;

  &:hover {
    transition: all 150ms linear;
    color: #fff;
    background-color: ${({ theme: { lightPrimary } }) => lightPrimary};
  }

  &:active {
    transition: all 150ms linear;
    color: #fff;
    background-color: ${({ theme: { lightestPrimary } }) => lightestPrimary};
  }

  ${({ selected, theme: { primary } }) =>
    selected && `background-color: ${primary}; color: #fff;`};
`

const StyledDialogOverlay = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(137, 137, 137, 0.6);
`

const StyledDialog = styled.div`
  display: grid;
  width: 350px;
  height: 160px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 2px 2px 2px #6a6a6a;
  font-family: 'Roboto', sans-serif;
`

const StyledDialogTitle = styled.div`
  text-align: justify;
  font-size: 1.2rem;
  margin: 1rem 1rem 0 1rem;
  color: ${({ theme: { fakeBlack } }) => fakeBlack};
`

const StyledDialogText = styled.div`
  text-align: justify;
  margin: 0 1rem;
  color: #8d8b8b;
`

const StyledDialogAction = styled.div`
  justify-self: flex-end;
  margin: 0 1rem;
`

const StyledDialogActionCancel = styled.a`
  text-decoration: none;
  cursor: pointer;
  margin-right: 1rem;
  color: ${({ theme: { fakeBlack } }) => fakeBlack};

  &:hover {
    transition: all 150ms linear;
    opacity: 0.85;
  }

  &:active {
    transition: all 150ms linear;
    opacity: 0.75;
  }
`

const StyledDialogActionRemove = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme: { danger } }) => danger};

  &:hover {
    transition: all 150ms linear;
    color: #ff3a3a;
  }

  &:active {
    transition: all 150ms linear;
    opacity: 0.75;
  }
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

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [confirmId, setConfirmId] = useState(null)
  const openConfirmDialogHandler = id => {
    setConfirmId(id)
    setOpenConfirmDialog(true)
  }
  const closeConfirmDialogHandler = () => setOpenConfirmDialog(false)
  const removeResponsibleHandler = async () => {
    const { status } = await removeResponsible(confirmId)
    if (status === 200) {
      await updateResponsibles()
    }
    setOpenConfirmDialog(false)
  }

  const onChangeFilterField = e => {
    setFilter({ ...filter, [e.target.id]: e.target.value })
  }

  const submmitFilter = () => {
    setPage(0)
    setFiltered(filter)
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
      <StyledAddLink to="/responsible/new" title="Cadastrar">
        <StyledAddIcon />
      </StyledAddLink>
      <StyledFilterWrapper>
        <StyledFilterFieldsWrapper>
          <StyledFilterField
            inputLabel="Nome"
            value={filter.nome}
            onChange={onChangeFilterField}
            id="nome"
          />
          <StyledFilterField
            inputLabel="E-mail"
            value={filter.email}
            onChange={onChangeFilterField}
            id="email"
          />
          <StyledFilterField
            inputLabel="CPF"
            value={filter.cpf}
            onChange={onChangeFilterField}
            id="cpf"
          />
        </StyledFilterFieldsWrapper>
        <DefaultButton onClick={submmitFilter}>Consultar</DefaultButton>
      </StyledFilterWrapper>

      <StyledSplit />

      <StyledListWrapper>
        {responsibles.length === 0 && (
          <StyledNoRecords>
            Não existe resultado para consulta executada
          </StyledNoRecords>
        )}
        {responsibles.length > 0 &&
          responsibles.map(({ id, nome, email, cpf, data_nascimento }) => {
            const [year = 0, month = 0, day = 0] = data_nascimento || []

            const expCpf = cpf.match(/(\d{3})(\d{3})(\d{3})(\d{2})/)
            const maskedCpf = `${expCpf[1]}.${expCpf[2]}.${expCpf[3]}-${
              expCpf[4]
            }`

            return (
              <StyledListItemWrapper key={`responsible_${id}`}>
                <StyledListItemGroup>
                  <StyledListItemFieldWrapper>
                    <StyledListItemField style={{ fontWeight: 700 }}>
                      {nome}
                    </StyledListItemField>
                    <StyledListItemFieldSplit>-</StyledListItemFieldSplit>
                    <StyledListItemField>{email}</StyledListItemField>
                  </StyledListItemFieldWrapper>
                  <StyledListItemFieldWrapper>
                    <StyledListItemField>{maskedCpf}</StyledListItemField>
                    {data_nascimento && (
                      <StyledListItemFieldSplit>-</StyledListItemFieldSplit>
                    )}
                    {data_nascimento && (
                      <StyledListItemField>
                        {`${day}`.replace(/^(\d)$/, '0$1')}/
                        {`${month}`.replace(/^(\d)$/, '0$1')}/{year}
                      </StyledListItemField>
                    )}
                  </StyledListItemFieldWrapper>
                </StyledListItemGroup>
                <StyledListItemActionWrapper>
                  <StyledEditLink to={`/responsible/edit/${id}`} title="Editar">
                    <StyledEditIcon />
                  </StyledEditLink>
                  <StyledRemoveLink
                    onClick={() => openConfirmDialogHandler(id)}
                    title="Remover"
                  >
                    <StyledRemoveIcon />
                  </StyledRemoveLink>
                </StyledListItemActionWrapper>
              </StyledListItemWrapper>
            )
          })}
        {pageArr.length > 1 && (
          <StyledPagination>
            <StyledPaginationButton onClick={() => setPage(0)}>
              {'|<'}
            </StyledPaginationButton>
            <StyledPaginationButton
              onClick={() => page > 0 && setPage(page - 1)}
            >
              {'<'}
            </StyledPaginationButton>
            {pageArr.map(element => (
              <StyledPaginationButton
                key={`pag_button_${element}`}
                selected={page === element - 1}
                onClick={() => setPage(element - 1)}
              >
                {element}
              </StyledPaginationButton>
            ))}
            <StyledPaginationButton
              onClick={() =>
                page < Math.ceil(records / 10) - 1 && setPage(page + 1)
              }
            >
              {'>'}
            </StyledPaginationButton>
            <StyledPaginationButton
              onClick={() => setPage(Math.ceil(records / 10) - 1)}
            >
              {'>|'}
            </StyledPaginationButton>
          </StyledPagination>
        )}
      </StyledListWrapper>

      {openConfirmDialog && (
        <StyledDialogOverlay onClick={closeConfirmDialogHandler}>
          <StyledDialog>
            <StyledDialogTitle>Deseja remover o registro?</StyledDialogTitle>
            <StyledDialogText>
              Ao confirmar a remoção do registro o mesmo será excluido
              permanentemente.
            </StyledDialogText>
            <StyledDialogAction>
              <StyledDialogActionCancel onClick={closeConfirmDialogHandler}>
                CANCELAR
              </StyledDialogActionCancel>
              <StyledDialogActionRemove onClick={removeResponsibleHandler}>
                REMOVER
              </StyledDialogActionRemove>
            </StyledDialogAction>
          </StyledDialog>
        </StyledDialogOverlay>
      )}
    </StyledWrapper>
  )
}

export default ResponsibleList
