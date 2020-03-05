import { Injectable, HttpStatus } from '@nestjs/common'
import { Op } from 'sequelize'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { User, Repository, Favourite } from '../entities'
import { sequelize } from '../database/sequelize'

@Injectable()
export class UserService {
  private userRepository = sequelize.getRepository(User)
  private githubRepository = sequelize.getRepository(Repository)
  private favouriteRepository = sequelize.getRepository(Favourite)
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

  async addToFavourite(payload, req) {
    const { url } = payload
    try {
      const response = await axios({
        method: 'GET',
        url,
      })
      const data = response.data

      const { id, full_name, owner, description, html_url } = data
      const { login, avatar_url } = owner
      const owner_url = owner.html_url
      let repo = await this.githubRepository.findOne({
        where: {
          github_id: id,
        },
      })

      if (!repo) {
        repo = await this.githubRepository.create({
          github_id: id,
          name: full_name,
          description,
          url: html_url,
          owner: login,
          owner_url,
          avatar_url,
        })
      }

      const found = await this.favouriteRepository.findOne({
        where: {
          [Op.and]: [
            {
              RepositoryId: repo.id,
            },
            {
              UserId: req.decoded,
            },
          ],
        },
      })

      if (found) {
        return {
          status: HttpStatus.BAD_REQUEST,
          error: 'You already added ' + repo.name + ' into your favourites',
        }
      }

      const newFavourite = await this.favouriteRepository.create({
        RepositoryId: repo.id,
        UserId: req.decoded,
      })
      return {
        status: HttpStatus.OK,
        favourite: newFavourite,
        message: repo.name + ' added to your favourites successfully ',
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
}