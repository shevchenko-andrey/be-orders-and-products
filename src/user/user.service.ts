import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findUserById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async removeUserById(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
