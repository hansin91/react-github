import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { UserController, GithubController } from './controllers'
import { UserService, GithubService } from './services'
import { DatabaseModule } from './database/database.module'
import { isAuthenticated } from './middlewares/isAuthenticated'

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, GithubController],
  providers: [
    UserService,
    GithubService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isAuthenticated).exclude(
      {
        path: 'github/search', method: RequestMethod.GET,
      },
      {
        path: 'users/login', method: RequestMethod.POST,
      },
    )
      .forRoutes(UserController, GithubController)
  }
}
