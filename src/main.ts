import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina los campos no definidos en el DTO
    }),
  ); // Agrega la validación global

  // codigo para swagger
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  // the endpoint swagger --> http://localhost:3000/api
  SwaggerModule.setup('api', app, documentFactory);

  // cors --> habilitar las peticiones de otros dominios o el configurado en el app.enableCors()
  // validar el dominio --> solo el dominio validado puede hacer peticiones
  app.enableCors({
    origin: 'https://portafolio-web-tl1w.vercel.app',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
