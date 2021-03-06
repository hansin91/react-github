import {
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SET_LOADING,
  SET_LOADING_APP,
  SET_LOADING_FAVOURITE,
  SET_ERRORS,
  SET_MESSAGE,
  VERIFY_TOKEN,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAILED,
  LOGOUT,
  SET_FAVOURITES,
  SET_TOTAL_FAVOURITES,
  LOAD_MORE_FAVOURITES,
  SET_ALL_FAVOURITE,
  SET_LOADING_DELETE,
  DELETE_FAVOURITE,
  MARK_AS_FAVOURITE
} from '../actions/types'

const initialState = {
  isAuthenticated: null,
  isLoading: null,
  isLoadingApp: null,
  isLoadingFavourite: null,
  isLoadingDelete: null,
  isDeleted: null,
  isFavourite: null,
  errors: [],
  favourites: [],
  totalFavourites: 0,
  allFavourite: [],
  message: '',
  user: {},
  token: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case MARK_AS_FAVOURITE:
      return {
        ...state,
        isFavourite: action.payload
      }
    case DELETE_FAVOURITE:
      return {
        ...state,
        isDeleted: action.payload
      }
    case SET_LOADING_DELETE:
      return {
        ...state,
        isLoadingDelete: action.payload
      }
    case SET_ALL_FAVOURITE:
      return {
        ...state,
        allFavourite: action.payload
      }
    case LOAD_MORE_FAVOURITES:
      return {
        ...state,
        favourites: [...state.favourites, ...action.payload]
      }
    case SET_TOTAL_FAVOURITES:
      return {
        ...state,
        totalFavourites: action.payload
      }
    case SET_FAVOURITES:
      return {
        ...state,
        favourites: action.payload
      }
    case SET_LOADING_FAVOURITE:
      return {
        ...state,
        isLoadingFavourite: action.payload
      }
    case SET_LOADING_APP:
      return {
        ...state,
        isLoadingApp: action.payload
      }
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload
      }
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload
      }
    case LOGIN:
      return {
        ...state,
        isAuthenticated: false,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        errors: [],
        token: action.payload.token
      }
    case LOGIN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        errors: action.payload.errors,
        token: ''
      }
    case VERIFY_TOKEN:
      return {
        ...state,
        isAuthenticated: false
      }
    case VERIFY_TOKEN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
    case VERIFY_TOKEN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      }
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      }
    default:
      return state
  }
}