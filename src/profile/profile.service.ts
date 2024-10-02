/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AstrologyService } from 'src/astrology/astrology.service';
import { RESPONSE_MESSAGE } from 'src/config/constants';
import { PostProfileDto } from 'src/dto/profile.dto';

import { Profile } from 'src/schema/profile.schema';
import { ExtendedProfile } from 'src/utils/types.util';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
    private readonly astrologyService: AstrologyService
  ) {}

  async getProfile(userId: string) {
    const profile = await this.profileModel.findOne({ userId }).lean().exec();

    if (!profile) throw new NotFoundException(RESPONSE_MESSAGE.PROFILE_NOT_FOUND);

    const zodiac = this.astrologyService.calculateZodiac(profile.birthday)
    const horoscope = this.astrologyService.calculateHoroscope(profile.birthday)

    const data: ExtendedProfile = {
      ...profile,
      zodiac,
      horoscope,
    }

    return {
      message: RESPONSE_MESSAGE.GET_PROFILE_SUCCESS,
      statusCode: 200,
      data
    };
  }

  async createProfile(userId: string, dto: PostProfileDto) {
    const checkIfExist = await this.profileModel.findOne({ userId }).exec();;

    if (checkIfExist) throw new UnauthorizedException(RESPONSE_MESSAGE.PROFILE_EXISTED);

    const newProfile = new this.profileModel({
      ...dto,
      userId,
    });

    const res = await newProfile.save();

    return {
      message: RESPONSE_MESSAGE.CREATE_PROFILE_SUCCESS,
      statusCode: 201,
      data: res
    }
  }

  async updateProfile(userId: string, dto: PostProfileDto) {
    const profile = await this.profileModel
      .findOneAndUpdate({ userId }, { $set: dto }, { new: true })
      .exec();

    if (!profile) throw new NotFoundException(RESPONSE_MESSAGE.PROFILE_NOT_FOUND);

    return {
      message: RESPONSE_MESSAGE.UPDATE_PROFILE_SUCCESS,
      statusCode: 201,
      data: profile
    };
  }
}
