import { Controller, Get, Res } from '@nestjs/common'
import { UserService } from '../services'
import { Response } from 'express'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  public async fetchUsers(@Res() res: Response) {
    const data = await this.userService.fetchUsers()
    res.status(data.status).json(data)
  }
}