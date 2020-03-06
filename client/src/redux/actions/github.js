import {
  SET_SEARCH_RESULT,
  SET_LOADING,
  SET_ERRORS,
  SET_REPOSITORY
} from './types'
import api from '../../api'
import { fetchAllFavourite } from './user'

const searchData = (value) => ({
  type: SET_SEARCH_RESULT,
  payload: value
})

const setLoading = (value) => ({
  type: SET_LOADING,
  payload: value
})

const setErrors = (errors) => ({
  type: SET_ERRORS,
  payload: errors
})

const setRepository = (data) => ({
  type: SET_REPOSITORY,
  payload: data
})

export const fetchRepositoryDetail = (name) => (dispatch, getState) => {
  dispatch(setLoading(true))
  dispatch(setRepository(''))
  api({
    method: 'GET',
    url: '/github/repository',
    params: {
      name
    }
  })
    .then(response => {
      dispatch(setErrors([]))
      dispatch(setRepository(response.data.repository))
      dispatch(fetchAllFavourite())
    })
    .catch(err => {
      dispatch(setErrors(err.response))
    })
    .finally(() => dispatch(setLoading(false)))
}

export const searchUserOrRepository = (params) => (dispatch) => {
  const { query, type, page, limit } = params
  dispatch(setLoading(true))
  api({
    method: 'GET',
    url: '/github/search',
    params: {
      type,
      query,
      page,
      limit
    }
  })
    .then(response => {
      dispatch(searchData(response.data))
    })
    .catch(err => {
      dispatch(setErrors(err.response))
    })
    .finally(() => dispatch(setLoading(false)))
}