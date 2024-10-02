/* eslint-disable prettier/prettier */
import { Model, Types } from 'mongoose';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';

import { Message } from 'src/schema/message.schema';
import { NOTIFICAITON_TYPE, RABBITMQ_CONFIG, RESPONSE_MESSAGE } from 'src/config/constants';
import { User } from 'src/schema/user.schema';
import { PostMessageDTO } from 'src/dto/chat.dto';
import { lastValueFrom } from 'rxjs';
import { ResponseMessageType } from 'src/utils/types.util';
import { Notification } from 'src/schema/notification.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Notification.name) private notificationModel: Model<Notification>,
    @Inject('CHAT_SERVICE') private readonly client: ClientProxy,
  ) {}

  async sendMessage(senderId: string, dto: PostMessageDTO) {
    const { receiverId, text } = dto;
    const sender = await this.userModel.findById(senderId).exec();
    const receiver = await this.userModel.findById(receiverId).exec();

    if (!sender || !receiver) throw new NotFoundException('User not found');

    const message = new this.messageModel({
      sender: sender._id,
      receiver: receiver._id,
      text,
    });

    const msgPayload: ResponseMessageType = {
      senderId,
      receiverId: dto.receiverId,
      text
    }

    await this.sendMessageToQueue(msgPayload)

    await message.save();

    sender.sentMessages.push(message);
    receiver.receivedMessages.push(message);

    await sender.save();
    await receiver.save();

    await this.notifyUser(receiverId, message._id.toString(), NOTIFICAITON_TYPE.RECEIVE_MESSAGE, `You have received a new message from ${sender.username}`)

    return {
      message: RESPONSE_MESSAGE.SEND_MESSAGE_SUCCESS,
      statusCode: 201,
      data: message
    };
  }

  async getMessagesByUserId(userId: string) {
    const objectId = new Types.ObjectId(userId);

    const messages = await this.messageModel
      .find({ $or: [{ sender: objectId }, { receiver: objectId }] })
      .populate('sender', 'username')
      .populate('receiver', 'username')
      .sort({ sendAt: 1 })
      .exec();

    const groupedMessages = messages.reduce((result, message) => {
      const partnerId = message.sender._id.toString() === objectId.toString() ? message.receiver._id.toString() : message.sender._id.toString();
      const partnerUsername = message.sender._id.toString() === objectId.toString() ? message.receiver.username : message.sender.username;
  
      if (!result[partnerId]) {
        result[partnerId] = {
          partner: { id: partnerId, username: partnerUsername },
          messages: []
        };
      }
  
      result[partnerId].messages.push(message);
  
      return result;
    }, {});
  
    const data = Object.values(groupedMessages);

    return {
      message: RESPONSE_MESSAGE.VIEW_MESSAGE_SUCCESS,
      statusCode: 200,
      data
    }
  }

  async sendMessageToQueue(message: ResponseMessageType): Promise<void> {
    const result = this.client.emit(RABBITMQ_CONFIG.CHAT_MESSAGE, message);
    /** wait until message received by rabbitmq */
    await lastValueFrom(result);
  }

  async notifyUser(receiverId: string, messageId: string, type: string, text: string) {
    const notificationData = { receiverId, messageId, type, text };
    const result = this.client.emit(RABBITMQ_CONFIG.SEND_NOTIFICATION, notificationData);
    await lastValueFrom(result);
  }

  @MessagePattern(RABBITMQ_CONFIG.CHAT_QUEUE)
  async handleMessage(data: ResponseMessageType) {
    console.log(`Received message from : ${data.senderId} :`, data.text);
  }

  @MessagePattern(RABBITMQ_CONFIG.NOTIFICATION_QUEUE)
  async handleNotification(notificationData: any) {
    const notification = new this.notificationModel(notificationData);
    await notification.save();

    console.log('Notification sent:', notificationData);
  }
}
