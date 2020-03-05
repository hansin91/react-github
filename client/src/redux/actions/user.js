import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  VERIFY_TOKEN,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAILED,
  SET_LOADING,
  SET_ERRORS,
  SET_LOADING_APP,
  LOGOUT,
  SET_MESSAGE,
  SET_LOADING_FAVOURITE,
  SET_FAVOURITES,
  SET_TOTAL_FAVOURITES,
  LOAD_MORE_FAVOURITES
} from './types'
import api from '../../api'

const login = () => ({
  type: LOGIN
})

const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data
})

const loginFailed = (errors) => ({
  type: LOGIN_FAILED,
  payload: errors
})

const setLoading = (value) => ({
  type: SET_LOADING,
  payload: value
})

const setLoadingApp = (value) => ({
  type: SET_LOADING_APP,
  payload: value
})

const setLoadingFavourite = (value) => ({
  type: SET_LOADING_FAVOURITE,
  payload: value
})

const setError = (error) => ({
  type: SET_ERRORS,
  payload: error
})

const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message
})

const setFavourites = (favourites) => ({
  type: SET_FAVOURITES,
  payload: favourites
})

const setTotalFavourites = (value) => ({
  type: SET_TOTAL_FAVOURITES,
  payload: value
})

const logoutUser = () => ({
  type: LOGOUT
})

export const logout = () => (dispatch) => {
  dispatch(logoutUser())
  localStorage.removeItem('token')
}

export const loginWithGithub = (code) => (dispatch) => {
  dispatch(setLoading(true))
  dispatch(login())
  api({
    method: 'POST',
    url: '/users/login',
    data: {
      code
    }
  })
    .then(response => {
      dispatch(loginSuccess(response.data))
      localStorage.setItem('token', response.data.token)
      dispatch(verifyUserToken())
      dispatch(setError(''))
    })
    .catch(err => {
      dispatch(loginFailed(err.response))
      dispatch(setError(err.response))
    })
    .finally(() => dispatch(setLoading(false)))
}

const verifyTokenFaild = () => ({
  type: VERIFY_TOKEN_FAILED
})

const verifyTokenSuccess = (user) => ({
  type: VERIFY_TOKEN_SUCCESS,
  payload: user
})

const verifyToken = () => ({
  type: VERIFY_TOKEN
})


export const verifyUserToken = () => (dispatch) => {
  dispatch(setLoadingApp(true))
  dispatch(verifyToken())
  api({
    method: 'GET',
    url: '/users',
    headers: {
      Authorization: 'Bearer ' + localStorage.token
    }
  })
    .then(response => {
      dispatch(verifyTokenSuccess(response.data.user))
      dispatch(setError(''))
    })
    .catch(err => {
      dispatch(verifyTokenFaild())
      dispatch(setError(err.response))
    })
    .finally(() => dispatch(setLoadingApp(false)))
}

export const fetchFavourites = (params) => (dispatch) => {
  dispatch(setLoading(true))
  dispatch(setTotalFavourites(0))
  api({
    method: 'GET',
    url: '/favourites',
    headers: {
      Authorization: 'Bearer ' + localStorage.token,
    },
    params: {
      page: params.page ? params.page : 1,
      limit: params.limit ? params.limit : 10
    }
  })
    .then(response => {
      dispatch(setFavourites(response.data.favourites))
      dispatch(setTotalFavourites(response.data.total))
    })
    .catch(err => {
      dispatch(setError(err.response))
    })
    .finally(() => dispatch(setLoading(false)))
}

const setMoreFavourites = (value) => ({
  type: LOAD_MORE_FAVOURITES,
  payload: value
})

export const loadMoreFavourites = (params) => (dispatch) => {
  dispatch(setLoading(true))
  dispatch(setTotalFavourites(0))
  api({
    method: 'GET',
    url: '/favourites',
    headers: {
      Authorization: 'Bearer ' + localStorage.token,
    },
    params: {
      page: params.page ? params.page : 1,
      limit: params.limit ? params.limit : 10
    }
  })
    .then(response => {
      dispatch(setMoreFavourites(response.data.favourites))
      dispatch(setTotalFavourites(response.data.total))
    })
    .catch(err => {
      dispatch(setError(err.response))
    })
    .finally(() => dispatch(setLoading(false)))
}

export const addToFavourite = (url) => (dispatch) => {
  dispatch(setLoadingFavourite(true))
  api({
    method: 'POST',
    url: '/favourites',
    headers: {
      Authorization: 'Bearer ' + localStorage.token,
    },
    data: {
      url
    }
  })
    .then(response => {
      dispatch(setError(''))
      dispatch(setMessage(response.data))
    })
    .catch(err => {
      dispatch(setError(err.response))
      dispatch(setMessage(''))
    })
    .finally(() => dispatch(setLoadingFavourite(false)))
}