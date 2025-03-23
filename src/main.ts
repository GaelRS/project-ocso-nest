import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "http://127.0.0.1:3000",
      credentials: true,
    },
  });
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Ocso API')
    .setDescription('Api for Ocso management')
    .setVersion('0.9')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Ocso API Documentation',
    customCss: `
      .swagger-ui .topbar .link svg {
        width: 150px; 
        height: 90px; 
      }
      .swagger-ui .topbar .link svg g {
        display: none; 
      }
      .swagger-ui .topbar .link svg {
        background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJx5JP3rSA9FcAZ28oyYcn74DDYFzs9n6QqQ&s'); /* URL de tu imagen */
        background-size: 90px 90px;
        background-repeat: no-repeat;
        background-position: center;
      }
      .swagger-ui .topbar { background-color: #E62E31; }
      .swagger-ui .opblock-tag {
        background-color: #F4CC07;
        color: #000;
        padding: 5px;
        border-radius: 3px;
      }
    `,
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  await app.listen(4000);
}
bootstrap();