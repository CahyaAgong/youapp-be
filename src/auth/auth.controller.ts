/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Request, Post, UnauthorizedException, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from 'src/dto/auth.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Auth Module')
@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login with registered account' })
  @ApiResponse({ status: 201, description: 'Login successfull.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 401, description: 'Invalid Credentials.' })
  @Post('login')
  async login(@Body() dto: LoginDTO) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'register new account' })
  @ApiResponse({ status: 201, description: 'register successfull.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @Post('register')
  async register(@Body() dto: RegisterDTO) {
    return await this.authService.register(dto);
  }
}
