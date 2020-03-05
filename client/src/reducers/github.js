import {
  SET_ERRORS,
  SET_LOADING,
  SET_MESSAGE,
  SET_SEARCH_RESULT,
  SET_REPOSITORY
} from '../actions/types'

const initialState = {
  users: [],
  isLoading: null,
  result: [],
  errors: [],
  totalItems: 0,
  message: '',
  repository: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_REPOSITORY:
      return {
        ...state,
        repository: action.payload
      }
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case SET_SEARCH_RESULT:
      return {
        ...state,
        result: action.payload.result.items,
        totalItems: action.payload.result.total_count
      }
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
        totalItems: state.totalItems
      }
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload
      }
    default:
      return state
  }
}