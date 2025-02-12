import { Request } from 'express';

export interface CustomRequest extends Request {
  user?: any; // Extend Express Request object
}
