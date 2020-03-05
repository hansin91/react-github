import { Controller, Get, Res, Query, Post, Body, Req } from '@nestjs/common'
import { UserService } from '../services'
import { Response } from 'express'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  public async findOneUser(@Res() res: Response, @Req() req) {
    const data = await this.userService.findOneUser(req)
    res.status(data.status).json(data)
  }

  @Post('login')
  public async loginWithGithub(@Res() res: Response, @Body() code: string) {
    const data = await this.userService.loginWithGithub(code)
    res.status(data.status).json(data)
  }

  @Post('favourite')
  public async addToFavourite(@Res() res: Response, @Req() req, @Body() payload: string) {
    const data = await this.userService.addToFavourite(payload, req)
    res.status(data.status).json(data)
  }
}