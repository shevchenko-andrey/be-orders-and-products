import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IGlobalConfig } from '../config/config.interfaces';
import { ITokenPayload } from './interfaces';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<IGlobalConfig>,
  ) {}

  generateAccessToken(payload: ITokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('accessSecretKey'),
      expiresIn: this.configService.get('accessTokenExpiration'),
    });
  }

  generateRefreshToken(payload: ITokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('refreshSecretKey'),
      expiresIn: this.configService.get('refreshTokenExpiration'),
    });
  }
}
