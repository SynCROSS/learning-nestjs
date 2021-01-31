// * main acts like the checkout counter;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // * this function is like paying at the checkout counter
  await app.listen(3000);
}
bootstrap();
