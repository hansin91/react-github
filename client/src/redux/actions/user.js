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
  LOAD_MORE_FAVOURITES,
  SET_ALL_FAVOURITE,
  SET_LOADING_DELETE,
  DELETE_FAVOURITE
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

export const setErrors = (error) => ({
  type: SET_ERRORS,
  payload: error
})

export const setMessage = (message) => ({
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
      dispatch(setErrors(err.response))
    })
    .finally(() => dispatch(setLoading(false)))
}

const setAllFavourite = (value) => ({
  type: SET_ALL_FAVOURITE,
  payload: value
})

export const fetchAllFavourite = () => (dispatch) => {
  api({
    method: 'GET',
    url: '/favourites',
    headers: {
      Authorization: 'Bearer ' + localStorage.token,
    }
  })
    .then(response => {
      dispatch(setAllFavourite(response.data.favourites))
    })
    .catch(err => {
      dispatch(setErrors(err.response))
    })
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
      dispatch(setErrors(err.response))
    })
    .finally(() => dispatch(setLoading(false)))
}

const setLoadingDelete = (value) => ({
  type: SET_LOADING_DELETE,
  payload: value
})

const setDeletedFavourite = (value) => ({
  type: DELETE_FAVOURITE,
  payload: value
})

export const deleteFavourite = (id) => (dispatch) => {
  dispatch(setLoadingDelete(true))
  dispatch(setDeletedFavourite(false))
  api({
    method: 'DELETE',
    url: '/favourites/' + id,
    headers: {
      Authorization: 'Bearer ' + localStorage.token
    }
  })
    .then(response => {
      dispatch(setDeletedFavourite(true))
      dispatch(setMessage(response.data.message))
      dispatch(fetchAllFavourite())
      dispatch(fetchFavourites({
        page: 1,
        limit: 10
      }))
    })
    .catch(err => {
      dispatch(setDeletedFavourite(false))
      dispatch(setErrors(err.response))
    })
    .finally(() => dispatch(setLoadingDelete(false)))
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
      dispatch(setErrors([]))
      dispatch(setMessage(response.data.message))
      dispatch(fetchAllFavourite())
    })
    .catch(err => {
      dispatch(setErrors([err.response.data.error]))
      dispatch(setMessage(''))
    })
    .finally(() => dispatch(setLoadingFavourite(false)))
}