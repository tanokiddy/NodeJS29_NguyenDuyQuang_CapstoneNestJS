import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.use(express.static('.'));
  //Swagger config
  const config = new DocumentBuilder()
    .setTitle('Swagger')
    .setDescription('AirBnb project API description')
    .setVersion('1.0')
    .addTag('AirBnb project - Nguyen Duy Quang')
    .addCookieAuth('UUID')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document); //localhost:3000/swagger
  //
  await app.listen(3000);
}
bootstrap();
