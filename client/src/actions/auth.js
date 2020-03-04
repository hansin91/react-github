import { LOGIN } from './types'

export const login = () => ({
  type: LOGIN,
  payload: {
    isLoading: false
  }
})