
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  //Cors
  app.enableCors({
    origin: 'https://localhost:3000',
    methods: 'GET,POST,PATCH,DELETE',
  });
  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  //
  const config = new DocumentBuilder()
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT-auth',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )

    .setTitle('Api Nest.js')
    .setDescription('Template api  com nest.js')
    .setVersion('0.0.1')

    .addTag('users')
    .addTag('auth')


    .addTag('categorias')


    .addTag('reset-password')
    .addTag('confirm-email')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document, {
    customSiteTitle: 'Backend Nest.js',
    customfavIcon:
      'https://ouch-cdn2.icons8.com/18LP8xCweygbXEHqkjUaa30CQzI_MSpsicHSlRD182U/rs:fit:521:456/extend:false/wm:1:re:0:0:0.8/wmid:ouch/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMzM4/LzU1NGM3NmY3LWNi/ODAtNDdiOC04MjNj/LTZiZGViMTYyNGM1/Yy5zdmc.png',
    // customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  });


  await app.listen(3000);
  Logger.warn(`Backend application is available at "http://localhost:3000".`);
}
bootstrap();
