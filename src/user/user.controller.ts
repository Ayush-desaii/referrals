import { Controller, Get, Post, Body, Param, Delete, Put, BadRequestException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersRef } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

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

  @Post('login')
  login(@Body() createUserDto: CreateUserDto): Promise<UsersRef> {
    return this.userService.login(createUserDto);
  }

  @Get()
  findAll(): Promise<UsersRef[]> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findById(@Param('id') id: number): Promise<UsersRef> {
    return this.userService.findById(id);
  }
}