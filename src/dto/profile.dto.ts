import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostProfileDto {
  @ApiProperty({ example: 'john doe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '10-10-2005' })
  @IsNotEmpty()
  @IsString()
  birthday: string;

  @ApiProperty({ example: 150 })
  @IsOptional()
  height: number;

  @ApiProperty({ example: 53 })
  @IsOptional()
  weight: number;

  @ApiProperty({ example: ['drawing', 'eating'] })
  @IsArray()
  @IsOptional()
  interest: string[];
}
