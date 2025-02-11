import { IsString, IsEmail, IsNotEmpty, IsNumber, IsArray } from '@nestjs/class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsNumber()
  @IsNotEmpty()
  readonly referalCode: number;

  @IsNumber()
  readonly referalBy: number;

  @IsArray()
  readonly referedUsers: number[];
}