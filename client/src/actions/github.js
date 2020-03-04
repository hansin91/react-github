import { SEARCH_DATA, SEARCH_DATA_SUCCESS, SEARCH_DATA_FAILED } from './types'
import githubAPI from '../api'

export const searchUserOrRepository = (params) => (dispatch) => {
  dispatch({
    type: SEARCH_DATA,
    payload: {
      isLoading: true
    }
  })
  const { query, type, page, limit } = params
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
      dispatch({
        type: SEARCH_DATA_SUCCESS,
        payload: {
          isLoading: false,
          data: response.data
        }
      })
    })
    .catch(err => {
      dispatch({
        type: SEARCH_DATA_FAILED,
        payload: {
          isLoading: false,
          errors: err.response
        }
      })
    })
}