import { Injectable, HttpStatus } from '@nestjs/common'
import { Op } from 'sequelize'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { User } from '../entities'
import { sequelize } from '../database/sequelize'

@Injectable()
export class UserService {
  private userRepository = sequelize.getRepository(User)
  async fetchUsers() {
    try {
      const users = await this.userRepository.findAll()
      return {
        status: HttpStatus.OK,
        users,
      }
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      }
    }
  }

  async findOneUser(req) {
    try {
      const id = req.decoded
      const user = await this.userRepository.findOne({
        include: [sequelize.models.Repository],
        where: {
          id,
        },
      })
      return {
        status: HttpStatus.OK,
        user,
      }
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      }
    }
  }

  async loginWithGithub(data: any) {
    const { code } = data
    try {
      let response = await axios({
        method: 'POST',
        url: 'https://github.com/login/oauth/access_token',
        data: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code,
        },
      })
      const access_token = response.data.split('&')[0].split('=')[1]
      response = await axios({
        method: 'GET',
        url: 'https://api.github.com/user',
        headers: {
          Accept: 'application/json',
          Authorization: 'token ' + access_token,
        },
      })
      const profile = response.data
      const {
        login,
        avatar_url,
        html_url,
        name,
        followers_url,
        following_url,
        repos_url,
        email } = profile
      let user = await this.userRepository.findOne({
        where: {
          [Op.or]: [
            {
              email,
            }, {
              username: login,
            },
          ],
        },
      })
      if (!user) {
        user = await this.userRepository.create({
          username: login,
          name,
          avatar_url,
          html_url,
          email,
          followers_url,
          repos_url,
          following_url,
        })
      }
      const payload = {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
      }
      const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
      return {
        status: HttpStatus.OK,
        token,
      }
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      }
    }
  }

  async fetchFollowers(req) {
    try {
      const id = req.decoded
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
      })

      const githubUser = await axios({
        method: 'GET',
        url: process.env.GITHUB_BASE_URL + '/users/' + user.username,
      })
      const url = githubUser.data.followers_url
      const page = req.query.page ? req.query.page : 1
      const limit = req.query.limit ? req.query.limit : 10
      const response = await axios({
        method: 'GET',
        url: url + '?page=' + page + '&per_page=' + limit,
      })
      return {
        status: HttpStatus.OK,
        followers: response.data,
        total: githubUser.data.followers,
      }
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      }
    }
  }

}