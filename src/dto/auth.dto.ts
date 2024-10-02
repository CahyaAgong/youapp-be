/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDTO {
  @ApiProperty({ example: 'john@mail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'john_human' })
  @IsString()
  @IsNotEmpty()
  username: string;

  
  @ApiProperty({ example: '12345678' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class LoginDTO {
  @ApiProperty({ description: 'Registered Email', example: 'john@mail.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Password for the registered accoount with the email', example: '12345678' })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
