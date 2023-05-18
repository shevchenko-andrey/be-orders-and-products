import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { UserService } from './../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  private saltOrRounds = 10;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  async register({
    email,
    password,
    ...userInfo
  }: RegisterDto): Promise<Partial<User>> {
    const user = await this.userService.findUserByEmail(email);

    if (user) {
      throw new ConflictException('This user already exists');
    }

    const hashedPassword = await bcrypt.hash(password, this.saltOrRounds);

    const { id } = await this.userRepository.save({
      email,
      hashedPassword,
      ...userInfo,
    });

    return {
      id,
      email,
      ...userInfo,
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findUserByEmail(email);

    if (user === null) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const isMatchPassword = await bcrypt.compare(password, user.hashedPassword);

    if (!isMatchPassword) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const payload = { email, sub: user.id };

    const accessToken = this.tokenService.generateAccessToken(payload);

    const refreshToken = this.tokenService.generateRefreshToken(payload);

    await this.updateRefreshToken(refreshToken, user.id);

    delete user.hashedPassword;

    delete user.refreshToken;

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async logOut(userId: number): Promise<void> {
    this.userRepository.update({ id: userId }, { refreshToken: null });
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userService.findUserById(userId);

    if (user.refreshToken === null) {
      throw new UnauthorizedException('Refresh token expired');
    }

    const isMatchRefreshToken = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!isMatchRefreshToken) {
      await this.logOut(userId);
      throw new ConflictException();
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = this.tokenService.generateAccessToken(payload);

    const newRefreshToken = this.tokenService.generateRefreshToken(payload);

    await this.updateRefreshToken(newRefreshToken, user.id);

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(refreshToken: string, userId: number) {
    const refreshHash = await bcrypt.hash(refreshToken, this.saltOrRounds);

    this.userRepository.update({ id: userId }, { refreshToken: refreshHash });
  }
}
