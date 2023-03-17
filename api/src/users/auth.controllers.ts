import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-dto';
import { UsersService } from './users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() credentials: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(
      credentials.email,
    );

    if (user === null) return new UnauthorizedException();

    const validPassword = bcrypt.compareSync(
      credentials.password,
      user.password,
    );

    if (!validPassword) return new UnauthorizedException();

    return 'OK';
  }
}
