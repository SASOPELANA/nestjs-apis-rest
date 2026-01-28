import { Controller, Res, Req, Get } from '@nestjs/common';
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
}
