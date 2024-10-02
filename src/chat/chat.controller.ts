/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { PostMessageDTO } from 'src/dto/chat.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RABBITMQ_CONFIG } from 'src/config/constants';
import { ResponseMessageType } from 'src/utils/types.util';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Chat Module')
@Controller('api')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  
  @ApiOperation({ summary: 'send message to other' })
  @ApiHeader({ name: 'x-access-token', description: 'Authorization Token' })
  @ApiResponse({ status: 200, description: 'send message success.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 401, description: 'Invalid Credentials.' })
  @UseGuards(JwtAuthGuard)
  @Post('sendMessage')
  sendMessage(@Request() req, @Body() dto: PostMessageDTO) {
    // dto.senderId = req.user.userId
    return this.chatService.sendMessage(req.user.userId, dto);
  }

  @ApiOperation({ summary: 'get message list from others' })
  @ApiHeader({ name: 'x-access-token', description: 'Authorization Token' })
  @ApiResponse({ status: 200, description: 'get message list success.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 401, description: 'Invalid Credentials.' })
  @UseGuards(JwtAuthGuard)
  @Get('viewMessages')
  async getMessagesByUserId(@Request() req) {
    return this.chatService.getMessagesByUserId(req.user.userId);
  }

  @EventPattern(RABBITMQ_CONFIG.CHAT_MESSAGE)
  handleReceiveMessage(@Payload() message: ResponseMessageType) {
    return this.chatService.handleMessage(message);
  }

  @EventPattern(RABBITMQ_CONFIG.SEND_NOTIFICATION)
  handleNotification(@Payload() notification: any) {
    return this.chatService.handleNotification(notification);
  }
}
