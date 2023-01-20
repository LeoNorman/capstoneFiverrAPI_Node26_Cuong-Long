import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paging } from './dto/find-all.dto';
import { User } from './user.entity';

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
}
