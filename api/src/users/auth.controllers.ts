import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() credentials: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(
      credentials.email,
    );

    if (!user) throw new UnauthorizedException();

    const validPassword = bcrypt.compareSync(
      credentials.password,
      user.password,
    );

    if (!validPassword) throw new UnauthorizedException();

    return 'OK';
  }

  @Post('register')
  @HttpCode(201)
  async register(@Body() registerDto: RegisterDto) {
    const userExists =
      (await this.usersService.findOneByEmail(registerDto.email)) !== null;

    if (userExists) return new BadRequestException({ email: 'unavailable' });

    const user = await this.usersService.create(registerDto);

    delete user.password;

    return user;
  }
}
