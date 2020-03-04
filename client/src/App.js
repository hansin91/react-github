import React, { Component } from 'react'
import './App.scss'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'
import Main from './Main'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" component={Main} />
        </Router>
      </Provider>
    )
  }
}

export default App
