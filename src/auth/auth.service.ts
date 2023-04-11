import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { IGlobalConfig } from 'src/config/config.interfaces';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService<IGlobalConfig>,
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

    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

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
      throw new UnauthorizedException();
    }

    const isMatchPassword = await bcrypt.compare(password, user.hashedPassword);

    if (!isMatchPassword) {
      throw new UnauthorizedException();
    }

    const payload = { email, sub: user.id };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('accessSecretKey'),
    });

    this.userRepository.update({ id: user.id }, { isLoggedId: true });

    return { accessToken };
  }

  async logOut(userId: number): Promise<void> {
    this.userRepository.update({ id: userId }, { isLoggedId: false });
  }
}
