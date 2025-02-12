import { Request } from 'express';

declare module 'express' {
   interface CustomRequest extends Request {
    user?: any; // Define `user` globally for all Express requests
  }
}
