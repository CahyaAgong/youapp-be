/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { User } from 'src/schema/user.schema';
import { RegisterDTO } from 'src/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(dto: RegisterDTO): Promise<User> {
    const {email, username, password} = dto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ email, username, password: hashedPassword });
    return newUser.save();
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
