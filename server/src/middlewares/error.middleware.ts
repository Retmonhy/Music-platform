import { ApiError } from '../exceptions';
import {
  Injectable,
  NestMiddleware,
  HttpCode,
  Req,
  Res,
  Next,
} from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    console.log(
      '________________________________________________________________________________Request...',
    );
    next();
    // next();
    // if (this.error instanceof ApiError) {
    // return res
    //   .status(this.error.status)
    //   .json({ message: this.error.message, errors: this.error.errors });
    // }
    // return res.status(500).json({ message: 'Произошла неизвестная ошибка' });
  }
}
