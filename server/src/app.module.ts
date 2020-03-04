import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController, GithubController } from './controllers'
import { UserService, GithubService } from './services'
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, UserController, GithubController],
  providers: [AppService, UserService, GithubService],
})
export class AppModule { }
