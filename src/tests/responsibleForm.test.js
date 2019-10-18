import React from 'react'
import { shallow } from 'enzyme'
import ResponsibleForm from '../components/responsibleForm'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({}),
  useHistory: () => ({}),
}))

describe('ResponsibleForm component test with Enzyme', () => {
  it('renders without crashing', () => {
    shallow(<ResponsibleForm />)
  })
})
