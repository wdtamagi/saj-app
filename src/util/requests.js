import axios from 'axios'

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

//Responsáveis

export const allResponsibles = async ({ nome, cpf, email, page }) => {
  let res = await axios.post(
    `/responsaveis/find-all?page=${page}&size=10`,
    { nome, cpf, email },
    {
      headers: headers,
    }
  )
  return res
}

export const removeResponsible = async id => {
  let res = await axios.delete(
    `/responsaveis/${id}`,
    {},
    {
      headers: headers,
    }
  )
  return res
}

export const getResponsible = async id => {
  let res = await axios.get(`/responsaveis/${id}`, {
    headers: headers,
  })
  return res
}

export const createResponsible = async data => {
  let res = await axios.post(`/responsaveis/`, data, {
    headers: headers,
  })
  return res
}

export const editResponsible = async data => {
  let res = await axios.put(`/responsaveis/${data.id}`, data, {
    headers: headers,
  })
  return res
}
