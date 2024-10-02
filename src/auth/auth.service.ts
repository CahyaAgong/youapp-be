import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { User } from 'src/schema/user.schema';
import { RegisterDTO } from 'src/dto/auth.dto';
import { RESPONSE_MESSAGE } from 'src/config/constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    return this.userService.validateUser(email, password);
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };

    return {
      message: RESPONSE_MESSAGE.LOGIN_SUCCESS,
      statusCode: 201,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: RegisterDTO) {
    const res = await this.userService.create(dto);

    return {
      message: RESPONSE_MESSAGE.REGISTER_SUCESS,
      statusCode: 201,
      user: res,
    };
  }

  async getUser(email: string): Promise<User | null> {
    return this.userService.findOne(email);
  }
}
