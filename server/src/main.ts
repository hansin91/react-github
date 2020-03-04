import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

// tslint:disable-next-line:no-var-requires
require('dotenv').config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use(helmet())
  await app.listen(4000);
}
bootstrap();
