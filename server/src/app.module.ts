import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { UserController, GithubController, FavouriteController } from './controllers'
import { UserService, GithubService, FavouriteService } from './services'
import { DatabaseModule } from './database/database.module'
import { isAuthenticated } from './middlewares/isAuthenticated'

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, GithubController, FavouriteController],
  providers: [
    UserService,
    GithubService,
    FavouriteService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isAuthenticated).exclude(
      {
        path: 'github/search', method: RequestMethod.GET,
      },
      {
        path: 'github/repository', method: RequestMethod.GET,
      },
      {
        path: 'users/login', method: RequestMethod.POST,
      },
    )
      .forRoutes(UserController, GithubController, FavouriteController)
  }
}
