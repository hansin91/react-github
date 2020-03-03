import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './controllers'
import { UserService } from './services'
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule { }
