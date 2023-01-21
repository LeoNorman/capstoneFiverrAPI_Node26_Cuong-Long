import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

//nest g middleware logger --no-spec --flat

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    next();
  }
}
