import React from 'react'
import { shallow } from 'enzyme'
import ResponsibleList from '../components/responsibleList'

describe('ResponsibleList component test with Enzyme', () => {
  it('renders without crashing', () => {
    shallow(<ResponsibleList />)
  })
})
