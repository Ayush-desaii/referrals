import { Controller, Get, Post, Body, Param, Delete, Put, BadRequestException, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersRef } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { CustomRequest } from "../../custom-request.interface"

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

  @Get("get")
  findById(@Req() req: CustomRequest): Promise<UsersRef> {
    if (!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }
  
    console.log(req.user.id);
    return this.userService.findById(req.user.sub);
  }
}