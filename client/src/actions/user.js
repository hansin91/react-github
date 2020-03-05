import {
  SET_LOADING_FAVOURITE,
  SET_ERROR_FAVOURITE,
  SET_MESSAGE_FAVOURITE
} from '../actions/types'

import api from '../api'

const setLoading = (value) => ({
  type: SET_LOADING_FAVOURITE,
  payload: value
})

const setMessage = (message) => ({
  type: SET_MESSAGE_FAVOURITE,
  payload: message
})

const setError = (error) => ({
  type: SET_ERROR_FAVOURITE,
  payload: error
})

export const addToFavourite = (url) => (dispatch) => {
  dispatch(setLoading(true))
  api({
    method: 'POST',
    url: '/users/favourite',
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
      dispatch(setError(err.response.data))
      dispatch(setMessage(''))
    })
    .finally(() => dispatch(setLoading(false)))
}