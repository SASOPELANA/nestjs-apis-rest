import { Controller, Res, Req, Get, HttpCode } from '@nestjs/common';
import type { Request, Response } from 'express';

@Controller('/auth')
export class AuthController {
  @Get()
  getAuth(@Req() request: Request, @Res() response: Response) {
    console.log(request.url);
    response.status(200).json({
      message: 'Hola mundo!!!',
    });
  }

  // métodos de codigo http, status error
  @Get('/notfount')
  @HttpCode(404) // método de codigo http de nestjs
  notFoundPage() {
    return 'Error 404';
  }

  @Get('/error')
  @HttpCode(500)
  errorPage() {
    return 'Error Route.';
  }
}
