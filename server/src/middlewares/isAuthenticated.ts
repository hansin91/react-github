import { Response, NextFunction } from 'express'
import { HttpStatus, HttpException } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { User } from '../entities'
import { sequelize } from '../database/sequelize'

export const isAuthenticated = (req, res: Response, next: NextFunction) => {
  try {
    const userRepository = sequelize.getRepository(User)
    const header = req.headers.authorization
    if (header) {
      const token = header.split(' ')[1]
      if (token) {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        userRepository.findOne({
          where: {
            id: decoded.id,
          },
        })
          .then(user => {
            if (user) {
              req.decoded = user.id
              next()
            } else {
              throw new HttpException('Please login first', HttpStatus.UNAUTHORIZED)
            }
          })
          .catch(err => {
            next(err)
          })
      } else {
        throw new HttpException('Please login first', HttpStatus.UNAUTHORIZED)
      }
    } else {
      throw new HttpException('Please login first', HttpStatus.BAD_REQUEST)
    }
  } catch (error) {
    throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
  }
}