import { combineReducers } from 'redux'
import github from './github'
import user from './user'

export default combineReducers({
  github,
  user
})