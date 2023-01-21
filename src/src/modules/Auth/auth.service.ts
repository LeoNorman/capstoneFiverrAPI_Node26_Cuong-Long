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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async login({ email, password }: LoginDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw new BadRequestException('email or password invalid');
      }

      // Dùng bcrypt để hashpass rồi mới check
      // if(user.password === password)

      return {
        accessToken: this.jwtService.sign({ email }),
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
