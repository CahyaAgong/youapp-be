import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostMessageDTO {
  // @ApiProperty({ description: 'ID of current user / sender Id' })
  // @IsOptional()
  // @IsString()
  // senderId?: string;

  @ApiProperty({ description: 'ID of target user / receiver Id' })
  @IsString()
  @IsNotEmpty()
  receiverId: string;

  @ApiProperty({ description: 'text or message to send' })
  @IsString()
  @IsNotEmpty()
  text: string;
}
