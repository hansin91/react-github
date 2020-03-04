import { combineReducers } from 'redux'
import github from './github'
import auth from './auth'

export default combineReducers({
  github,
  auth
})