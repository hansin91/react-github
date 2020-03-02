import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import HomePageComponent from './components/Homepage'
import './style.scss'

class HomePage extends Component {
  render () {
    return (
      <Fragment>
        <Navbar />
        <Router>
          <Switch>
            <Route path="/" component={HomePageComponent} />
          </Switch>
        </Router>
      </Fragment>
    )
  }
}

export default HomePage