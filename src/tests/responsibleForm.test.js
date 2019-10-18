import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router'

import ResponsibleForm from '../components/responsibleForm'
import { Routes } from '../App'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({}),
  useHistory: () => ({}),
}))

describe('ResponsibleForm component test with Enzyme', () => {
  it('renders without crashing', () => {
    shallow(<ResponsibleForm />)
  })

  it('should render the ResponsibleForm component for /responsible/new route', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/responsible/new']}>
        <Routes />
      </MemoryRouter>
    )

    expect(wrapper.find(ResponsibleForm)).toHaveLength(1)
    expect(
      wrapper
        .find('#ResponibleFormButton')
        .first()
        .text()
    ).toEqual('Cadastrar')
  })
})
