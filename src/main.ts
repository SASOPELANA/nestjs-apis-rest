import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina los campos no definidos en el DTO
    }),
  ); // Agrega la validación global
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
