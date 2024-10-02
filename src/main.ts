import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { RABBITMQ_CONFIG } from './config/constants';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 8000;

  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_CONFIG.URLS],
      queue: RABBITMQ_CONFIG.CHAT_QUEUE,
      queueOptions: { durable: false },
    },
  });
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_CONFIG.URLS],
      queue: RABBITMQ_CONFIG.NOTIFICATION_QUEUE,
      queueOptions: { durable: false },
    },
  });

  const config = new DocumentBuilder()
    .setTitle('YouApp Backend Project')
    .setDescription('API documentation for the YouApp Backend application')
    .setVersion('1.0')
    .addTag('auth/profile/chat')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  console.log('Run at port ' + port);

  await app.startAllMicroservices();

  await app.listen(port);
}
bootstrap();
