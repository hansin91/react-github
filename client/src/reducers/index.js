import { combineReducers } from 'redux'
import github from './github'
import auth from './auth'
import user from './user'

export default combineReducers({
  github,
  auth,
  user
})