import { Injectable, HttpStatus } from '@nestjs/common'
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
}