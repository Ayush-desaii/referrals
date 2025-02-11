import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRef } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRef])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})

export class UserModule {}