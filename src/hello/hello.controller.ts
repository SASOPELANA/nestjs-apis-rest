import { Controller, Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {
  @Get()
  getHollo() {
    return 'Hola controllers';
  }
}
