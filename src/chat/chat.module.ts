/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { Message, MessageSchema } from 'src/schema/message.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RABBITMQ_CONFIG } from 'src/config/constants';
import { Notification, NotificationSchema } from 'src/schema/notification.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
    ClientsModule.register([
      {
        name: RABBITMQ_CONFIG.CHAT_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_CONFIG.URLS],
          queue: RABBITMQ_CONFIG.CHAT_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: RABBITMQ_CONFIG.NOTIFICATION_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_CONFIG.URLS],
          queue: RABBITMQ_CONFIG.NOTIFICATION_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [ChatService, JwtService],
  controllers: [ChatController],
})
export class ChatModule {}
