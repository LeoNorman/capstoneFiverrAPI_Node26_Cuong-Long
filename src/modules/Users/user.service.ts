import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.dto';
import { Filter, Paging } from './dto/find-all.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAllWithCondition(paging: Paging, filter: Filter) {
    try {
      const { page, pageSize } = paging;
      const { role = '', name = '' } = filter;
      // const [result, total] = await this.userRepository.findAndCount({
      //   where: {
      //     name: Like('%' + name + '%'),
      //     role,
      //   },
      //   take: pageSize || 10,
      //   skip: (page - 1) * pageSize || 0,
      // });
      // return {
      //   data: result,
      //   paging: {
      //     total,
      //     page: page || 1,
      //     pageSize: pageSize || 10,
      //   },
      // };

      const [users, total] = await this.userRepository
        .createQueryBuilder('user')
        .where('user.role like :role', { role: `%${role}%` })
        .andWhere('user.name like :name', { name: `%${name}%` })
        .skip((page - 1) * pageSize || 0)
        .take(pageSize || 10)
        .getManyAndCount();
      return {
        data: users,
        paging: {
          total,
          page: page || 1,
          pageSize: pageSize || 10,
        },
      };
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
