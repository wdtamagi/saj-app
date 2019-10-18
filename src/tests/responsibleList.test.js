import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router'

import ResponsibleList from '../components/responsibleList'
import { Routes } from '../App'

describe('ResponsibleList component test with Enzyme', () => {
  it('renders without crashing', () => {
    shallow(<ResponsibleList />)
  })

  it('should render the ResponsibleList component for /responsible route', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/responsible']}>
        <Routes />
      </MemoryRouter>
    )

    expect(wrapper.find(ResponsibleList)).toHaveLength(1)
  })
})
