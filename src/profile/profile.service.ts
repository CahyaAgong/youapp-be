/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AstrologyService } from 'src/astrology/astrology.service';
import { PostProfileDto } from 'src/dto/profile.dto';

import { Profile } from 'src/schema/profile.schema';
import { ExtendedProfile } from 'src/utils/types.util';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
    private readonly astrologyService: AstrologyService
  ) {}

  async getProfile(userId: string): Promise<ExtendedProfile> {
    const profile = await this.profileModel.findOne({ userId }).lean().exec();

    if (!profile) throw new NotFoundException('Profile not found');

    const zodiac = this.astrologyService.calculateZodiac(profile.birthday)
    const horoscope = this.astrologyService.calculateHoroscope(profile.birthday)

    return {
      ...profile,
      zodiac,
      horoscope,
    };
  }

  async createProfile(userId: string, dto: PostProfileDto): Promise<Profile> {
    const checkIfExist = await this.profileModel.findOne({ userId }).exec();;

    if (checkIfExist)
      throw new UnauthorizedException('Profile already exist for this user!');

    const newProfile = new this.profileModel({
      ...dto,
      userId,
    });
    return newProfile.save();
  }

  async updateProfile(userId: string, dto: PostProfileDto): Promise<Profile> {
    const profile = await this.profileModel
      .findOneAndUpdate({ userId }, { $set: dto }, { new: true })
      .exec();

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }
}
