import { IsNumber, IsEmail } from 'class-validator';
import { Gender, UserRole } from '../user.entity';

export class CreateUserDto {
  name: string;

  @IsEmail()
  email: string;

  password: string;

  // @IsNumber()
  phone: string;

  birthday: string;

  avatar?: string;

  gender: Gender;

  role?: UserRole;

  skill: string;

  certification: string;
}
