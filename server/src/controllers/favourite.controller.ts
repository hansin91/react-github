import { Controller, Post, Req, Body, Res, Get, Delete, Param } from '@nestjs/common'
import { FavouriteService } from 'src/services';
import { Request, Response } from 'express'

@Controller('favourites')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) { }

  @Post()
  public async addToFavourite(@Res() res: Response, @Req() req, @Body() payload: string) {
    const data = await this.favouriteService.addToFavourite(payload, req)
    res.status(data.status).json(data)
  }

  @Delete(':id')
  public async deleteFavourites(@Res() res: Response, @Param('id') id) {
    const data = await this.favouriteService.deleteFavourites(+id)
    res.status(data.status).json(data)
  }

  @Get()
  public async fetchFavourites(@Res() res: Response, @Req() req) {
    const data = await this.favouriteService.fetchFavourites(req)
    res.status(data.status).json(data)
  }
}
