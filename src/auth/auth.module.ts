import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { JwtRefreshStrategy, JwtStrategy } from './strategies';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User]), JwtModule],
  providers: [AuthService, TokenService, JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
