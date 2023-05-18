import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { GetCurrentUserId } from 'src/common/decorators';
import { Cookies } from 'src/common/decorators/cookies.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: LoginDto,
  ) {
    const { accessToken, refreshToken, user } = await this.authService.login(
      loginDto,
    );

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

    return { accessToken, user };
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logOut(
    @Res({ passthrough: true })
    res: Response,
    @GetCurrentUserId()
    id: number,
  ) {
    await this.authService.logOut(id);
    res.clearCookie('refreshToken');
  }

  @Public()
  @Post('/refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @Cookies('refreshToken') oldRefreshToken: string,
    @Res({ passthrough: true })
    res: Response,
    @GetCurrentUserId()
    id: number,
  ) {
    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      id,
      oldRefreshToken,
    );

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

    return { accessToken };
  }
}
