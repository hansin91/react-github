import {
  SET_LOADING_FAVOURITE,
  SET_MESSAGE_FAVOURITE,
  SET_ERROR_FAVOURITE
} from '../actions/types'

const initialState = {
  favourites: [],
  isLoading: null,
  error: null,
  message: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_FAVOURITE:
      return {
        ...state,
        isLoading: action.payload
      }
    case SET_MESSAGE_FAVOURITE:
      return {
        ...state,
        message: action.payload.message
      }
    case SET_ERROR_FAVOURITE:
      return {
        ...state,
        error: action.payload.error
      }
    default:
      return state
  }
}