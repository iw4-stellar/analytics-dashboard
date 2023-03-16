import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

// App
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Users
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
