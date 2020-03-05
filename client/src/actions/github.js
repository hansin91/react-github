import { SET_SEARCH_RESULT, SET_LOADING, SET_ERRORS } from './types'
import githubAPI from '../api'

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

export const searchUserOrRepository = (params) => (dispatch) => {
  const { query, type, page, limit } = params
  dispatch(setLoading(true))
  githubAPI({
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