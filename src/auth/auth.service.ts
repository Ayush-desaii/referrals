import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
   
    if (user && await bcrypt.compare(password, user.password)) { // Direct password comparison
      const { password, ...result } = user; // Exclude password from response
      
      return result;
    }
    return null;
  }

  async login(user: any, res: Response) {
    const payload = { email: user.email, sub: user.id };
    const access_token =  this.jwtService.sign(payload);
    
    res.cookie('jwt', access_token, { httpOnly: true , maxAge: 24*60*60*1000}).json({m:"hugug"}); // Set cookie with JWT
    return {
      messgae: "login success",
    };
  }
}
