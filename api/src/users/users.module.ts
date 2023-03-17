import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Site } from 'src/sites/entities/site.entity';
import { AuthController } from './auth.controllers';

@Module({
  imports: [TypeOrmModule.forFeature([User, Site])],
  exports: [TypeOrmModule],
  controllers: [UsersController, AuthController],
  providers: [UsersService],
})
export class UsersModule {}
