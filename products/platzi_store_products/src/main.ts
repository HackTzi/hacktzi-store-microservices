import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const PORT = process.env.PORT
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({logger: true}));
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true
    }
  ));
  await app.listen(PORT || 3000, '0.0.0.0');
}
bootstrap();
