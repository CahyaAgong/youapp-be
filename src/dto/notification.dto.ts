import { IsNotEmpty, IsString } from 'class-validator';

export class PostNotifDTO {
  @IsString()
  @IsNotEmpty()
  receiverId: string;

  @IsString()
  @IsNotEmpty()
  messageId: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
