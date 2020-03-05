import React, { Component, Suspense } from 'react'
import './App.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/Homepage'
import LoadingApp from './components/LoadingApp'
import { connect } from 'react-redux'
import { verifyUserToken } from './actions'
import { Container } from 'reactstrap'

class App extends Component {

  componentDidMount () {
    if (localStorage.token) {
      this.props.verifyUserToken()
    }
  }

  render () {
    const Search = React.lazy(() => import('./pages/Search'))
    const RepositoryDetail = React.lazy(() => import('./pages/RepositoryDetail'))
    return (
      <Router>
        {this.props.isLoading && <LoadingApp />}
        <Navbar />
        <Container className="wrapper">
          <Switch>
            <Route path="/search" render={() =>
              <Suspense fallback={<div />}>
                <Search />
              </Suspense>} />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/repository/:user/:repo_name" render={() =>
              <Suspense fallback={<div />}>
                <RepositoryDetail />
              </Suspense>} />
          </Switch>
        </Container>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoadingApp
  }
}

export default connect(mapStateToProps, { verifyUserToken })(App)
