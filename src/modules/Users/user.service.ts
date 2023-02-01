import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
        .take(pageSize)
        .getManyAndCount();
      return {
        data: users,
        paging: {
          total,
          page: page || 1,
          pageSize: pageSize,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async createUser(data: CreateUserDto) {
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

  async findOneWithCondition(condition: Record<string, unknown>) {
    try {
      const user = await this.userRepository.findOne({ where: condition });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException('user not found');
      }
      await this.userRepository.delete(id);
      return 'user deleted';
    } catch (error) {
      throw error;
    }
  }
}
