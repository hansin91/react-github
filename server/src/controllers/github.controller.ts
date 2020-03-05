import { Controller, Get, Res, Query } from '@nestjs/common'
import { GithubService } from '../services'
import { Response } from 'express'

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) { }

  @Get('search')
  async fetchData(
    @Res() res: Response,
    @Query('type') type: string,
    @Query('query') query: string,
    @Query('page') page: number,
    @Query('limit') limit: number) {
    const params = {
      type,
      query,
      page,
      limit,
    }
    const data = await this.githubService.searchUserOrRepository(params)
    res.status(data.status).json(data)
  }
}