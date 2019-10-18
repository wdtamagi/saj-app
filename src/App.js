import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'

import ResponsibleList from './components/responsibleList'
import ResponsibleForm from './components/responsibleForm'

const theme = {
  primary: '#2128bd',
  lightPrimary: '#494fc2',
  lightestPrimary: '#797cc2',
  fakeBlack: '#302f2f',
  fakeWhite: '#f5f2f2',
  danger: '#ff6161',
}

const StyledMenuBar = styled.nav`
  display: flex;
  background-color: #f5f2f2;
`

const StyledLogo = styled.img`
  height: 50px;
  margin: auto 1rem;
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
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.5rem;
  color: #2128bd;
  border-radius: 4px;

  ${({ active }) => (active ? 'border: 2px solid #2128bd;' : '')}
  &:hover {
    color: #fff;
    background-color: #2128bd;
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
      <ThemeProvider theme={theme}>
        <div>
          <StyledMenuBar>
            <StyledLogo src="http://localhost:3000/logo.png" alt="" />
            <StyledMenu>
              <StyledMenuItem>
                <MenuLink to="/responsible" label="Responsáveis" />
              </StyledMenuItem>
            </StyledMenu>
          </StyledMenuBar>

          <Switch>
            <Route exact path="/responsible">
              <ResponsibleList />
            </Route>
            <Route path="/responsible">
              <Switch>
                <Route
                  path={[
                    '/responsible/new',
                    '/responsible/edit/:responsableId',
                  ]}
                >
                  <ResponsibleForm />
                </Route>
              </Switch>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  )
}

function Home() {
  return <h2>SAJ App</h2>
}

export default App
