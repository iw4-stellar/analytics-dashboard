import { User } from '../entities/user.entity';

export class RegisterDto {
  email: User['email'];
  password: string;
}
