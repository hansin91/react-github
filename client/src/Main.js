import React, { Suspense, Fragment } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import HomePage from './pages/Homepage'
import Navbar from './components/Navbar'

function Main () {
  const Search = React.lazy(() => import('./pages/Search'))
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/search" render={() =>
          <Suspense fallback={<div />}>
            <Search />
          </Suspense>} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </Fragment>
  )
}

export default withRouter(Main)