import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Injectable()
export class MiddLoggerMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: () => void) {
    console.log(req.originalUrl);

    // autorizacion de la peticion
    const { authorization } = req.headers;

    // si no esta autorizado con --> tech123
    if (authorization !== 'tech123') {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    next();
  }
}
