import { LOGIN } from '../actions/types'

const initialState = {
  isAuthenticated: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: false
      }
    default:
      return state
  }
}