import { SEARCH_DATA, SEARCH_DATA_SUCCESS, SEARCH_DATA_FAILED } from '../actions/types'

const initialState = {
  users: [],
  isLoading: null,
  result: [],
  errors: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_DATA:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      }
    case SEARCH_DATA_SUCCESS:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        result: action.payload.data.result.items
      }
    case SEARCH_DATA_FAILED:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        result: state.result,
        errors: action.payload.errors
      }
    default:
      return state
  }
}