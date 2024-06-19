// src/middleware/morgan.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  private morganLogger = morgan('dev'); // or use any format you prefer

  use(req: Request, res: Response, next: NextFunction): void {
    this.morganLogger(req, res, next);
  }
}
