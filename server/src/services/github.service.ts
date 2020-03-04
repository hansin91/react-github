import { Injectable, HttpStatus } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class GithubService {
  async searchUserOrRepository(params) {
    const page = params.page ? params.page : 1
    const limit = params.limit ? params.limit : 10
    const type = params.type
    const query = params.query
    let url = ''
    if (type === 'user') {
      url = process.env.GITHUB_BASE_URL + '/search/users'
    } else {
      url = process.env.GITHUB_BASE_URL + '/search/repositories'
    }

    try {
      const response = await axios({
        method: 'GET',
        url: url + '?q=' + query + '&page=' + page + '&per_page=' + limit,
      })
      return {
        status: HttpStatus.OK,
        result: response.data,
      }
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response,
      }
    }
  }
}