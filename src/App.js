import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from 'react-router-dom'
import styled from 'styled-components'

import Responsibles from './pages/responsibles'

const StyledMenuBar = styled.nav`
  display: flex;
  background-color: #07bcdf;
`

const StyledLogo = styled.img`
  margin: 0 1rem;
`

const StyledMenu = styled.ul`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  list-style: none;
`

const StyledMenuItem = styled.li`
  margin: 0 1rem;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ active }) => (active ? '#fff' : '#2e2e2e')};

  &:hover {
    color: #fff;
  }
`

const MenuLink = ({ label, to, exact }) => {
  let match = useRouteMatch({
    path: to,
    exact: exact,
  })

  return (
    <StyledLink active={match} to={to}>
      {label}
    </StyledLink>
  )
}

const App = () => {
  return (
    <Router>
      <div>
        <StyledMenuBar>
          <StyledLogo src="./logo.png" alt="" />
          <StyledMenu>
            <StyledMenuItem>
              <MenuLink to="/responsibles" label="Responsáveis" />
            </StyledMenuItem>
          </StyledMenu>
        </StyledMenuBar>

        <Switch>
          <Route path="/responsibles">
            <Responsibles />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

function Home() {
  return <h2>SAJ App</h2>
}

export default App
