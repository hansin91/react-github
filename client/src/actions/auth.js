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
  LOGOUT
} from './types'
import api from '../api'

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

const setErrors = (errors) => ({
  type: SET_ERRORS,
  payload: errors
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
      dispatch(setErrors([]))
    })
    .catch(err => {
      dispatch(loginFailed(err.response))
      dispatch(setErrors(err.response))
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
      dispatch(setErrors([]))
    })
    .catch(err => {
      dispatch(verifyTokenFaild())
      dispatch(setErrors(err.response))
    })
    .finally(() => dispatch(setLoadingApp(false)))
}