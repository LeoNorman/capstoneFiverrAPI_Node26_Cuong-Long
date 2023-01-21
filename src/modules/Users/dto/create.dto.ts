import { UserRole } from '../user.entity';

export interface CreateUserDto {
  email: string;
  password: string;
  role?: UserRole;
}
