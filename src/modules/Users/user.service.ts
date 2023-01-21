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

  async create(data: CreateUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: data.email },
      });

      if (user) {
        throw new BadRequestException('email already existed');
      }

      // Ví dụ trong trường hợp admin thêm user, chỉ cần dùng email, ta cần phải tạo một mật khẩu ngẩu nhiên
      if (!data.password) {
        data.password = Math.random().toString(36).substring(2);
        // Gửi email về cho user mật khẩu này
        
        data.password = bcrypt.hashSync(data.password, 10);
      }

      //hashpass
      data.password = await bcrypt.hashSync(data.password, 10);

      return await this.userRepository.save(data);
    } catch (error) {
      throw error;
    }
  }
}
