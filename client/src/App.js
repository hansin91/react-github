import React, { Component, Suspense, Fragment } from 'react'
import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './pages/Homepage'

class App extends Component {
  render () {
    const Login = React.lazy(() => import('./pages/Login'))
    const Register = React.lazy(() => import('./pages/Register'))
    return (
      <Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" render={() =>
              <Suspense fallback={<div />}>
                <Login />
              </Suspense>} />
            <Route exact path="/register" render={() =>
              <Suspense fallback={<div />}>
                <Register />
              </Suspense>} />
          </Switch>
        </Router>
      </Fragment>
    )
  }
}

export default App
