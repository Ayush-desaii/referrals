import { Controller, Get, Post, Body, Param, Delete, Put, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersRef } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto): Promise<UsersRef> {

    if (!createUserDto.name) {
        throw new BadRequestException('Name is required');
    }

    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<UsersRef[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<UsersRef> {
    return this.userService.findById(id);
  }
}