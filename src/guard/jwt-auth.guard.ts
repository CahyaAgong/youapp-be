/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { jwtConstants } from 'src/config/constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['x-access-token'];

    if (!token) throw new UnauthorizedException('Token not found');
    
    const bearerToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;

    try {
      const user = await this.jwtService.verifyAsync(bearerToken.split(' ')[1], { secret: jwtConstants.secret });
      request.user = { userId: user.sub, email: user.email };
      return true;
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException('Invalid token');
    }
  }
}
