/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Put, Request, UseGuards } from '@nestjs/common';

import { ProfileService } from './profile.service';
import { PostProfileDto } from 'src/dto/profile.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Profile Module')
@Controller('api')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({ summary: 'get your profile data' })
  @ApiHeader({ name: 'x-access-token', description: 'Authorization Token' })
  @ApiResponse({ status: 200, description: 'Get Profile Success.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 401, description: 'Invalid Credentials.' })
  @UseGuards(JwtAuthGuard)
  @Get('getProfile')
  async getProfile(@Request() req) {
    return this.profileService.getProfile(req.user.userId);
  }
  
  @ApiOperation({ summary: 'create your profile data' })
  @ApiHeader({ name: 'x-access-token', description: 'Authorization Token' })
  @ApiResponse({ status: 201, description: 'Create Profile Success.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 401, description: 'Invalid Credentials.' })
  @UseGuards(JwtAuthGuard)
  @Post('createProfile')
  async createProfile(@Request() req, @Body() dto: PostProfileDto) {
    return this.profileService.createProfile(req.user.userId, dto);
  }

  
  @ApiOperation({ summary: 'update your profile data' })
  @ApiHeader({ name: 'x-access-token', description: 'Authorization Token' })
  @ApiResponse({ status: 201, description: 'Create Profile Success.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 401, description: 'Invalid Credentials.' })
  @UseGuards(JwtAuthGuard)
  @Put('updateProfile')
  async updateProfile(@Request() req, @Body() dto: PostProfileDto) {
    return this.profileService.updateProfile(req.user.userId, dto);
  }
}
