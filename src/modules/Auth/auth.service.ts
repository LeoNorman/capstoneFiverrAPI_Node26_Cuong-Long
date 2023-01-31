import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from '../Users/user.entity';
import { LoginDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async login({ email, password }: LoginDto) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email })
        .addSelect('user.password')
        .getOne();

      if (!user) {
        throw new BadRequestException('email or password invalid');
      }

      // Kiểm tra pass đã hash với password người dùng nhập vào
      const isMatched = bcrypt.compareSync(password, user.password);
      if (!isMatched) {
        throw new BadRequestException('email or password invalid');
      }

      return {
        accessToken: this.jwtService.sign({ email, password }),
        expireIn: 60 * 60 * 12,
      };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new InternalServerErrorException();
      }
      throw error;
    }
  }
}
