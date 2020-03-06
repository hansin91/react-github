import { Injectable, HttpStatus } from '@nestjs/common'
import { sequelize } from '../database/sequelize'
import { Repository, Favourite } from '../entities'
import axios from 'axios'
import { Op } from 'sequelize'

@Injectable()
export class FavouriteService {
  private githubRepository = sequelize.getRepository(Repository)
  private favouriteRepository = sequelize.getRepository(Favourite)

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

      const newFavouriteRepository = await this.githubRepository.findOne({
        include: [sequelize.models.Favourite],
        where: {
          id: repo.id,
        },
      })

      return {
        status: HttpStatus.CREATED,
        favourite: newFavouriteRepository,
        message: repo.name + ' added to your favourites successfully ',
      }
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      }
    }
  }

  async deleteFavourites(id) {
    try {
      const deleted = await this.favouriteRepository.destroy({
        where: {
          id,
        },
      })
      return {
        status: HttpStatus.OK,
        message: 'Successfully delete favourite',
      }
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      }
    }
  }

  async fetchFavourites(req) {
    const { page, limit } = req.query
    try {

      const total = await sequelize.models.Favourite.count({
        where: {
          UserId: req.decoded,
        },
      })

      let favourites = []
      if (page && limit) {
        favourites = await this.favouriteRepository.findAll({
          include: [sequelize.models.Repository],
          where: {
            UserId: req.decoded,
          },
          offset: (+page - 1) * +limit,
          limit: +limit,
        })
      } else {
        favourites = await this.favouriteRepository.findAll({
          include: [sequelize.models.Repository],
          where: {
            UserId: req.decoded,
          },
        })
      }
      return {
        status: HttpStatus.OK,
        favourites,
        total,
      }

    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      }
    }
  }
}