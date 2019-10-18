import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('should render the homepage for "/" route', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  )
  expect(wrapper.find('h2').text()).toEqual('SAJ App')
})
