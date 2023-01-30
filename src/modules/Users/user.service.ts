import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.dto';
import { Paging } from './dto/find-all.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAllWithCondition(paging: Paging) {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async userRegistration(data: CreateUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: data.email },
      });

      if (user) {
        throw new BadRequestException('email already existed');
      }

      return await this.userRepository.save(this.userRepository.create(data));
    } catch (error) {
      throw error;
    }
  }
}
