import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { CustomRequest } from '../../custom-request.interface';

@Injectable()
export class JwtCookieAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.cookies?.jwt;
    
    if (!token) {
      throw new UnauthorizedException('No authentication token found');
    }

    try {
      const decoded = this.jwtService.verify(token);
      req.user = decoded; // Attach decoded user to request
      console.log(req.user);

      next();
    } catch (error) {
      res.status(401).json({ error });
    }
  }
}
