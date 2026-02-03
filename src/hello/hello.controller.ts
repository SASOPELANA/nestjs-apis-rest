import {
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { HelloService } from './hello.service';
import { ValidateuserPipe } from './pipes/validateuser/validateuser.pipe';

@Controller('/hello')
export class HelloController {
  constructor(private helloService: HelloService) {}

  @Get()
  getHello() {
    return this.helloService.getHello();
  }

  @Get('/ticket/:num')
  // ParseIntPipe --> convierte el string a number
  getNumber(@Param('num', ParseIntPipe) num: number) {
    return this.helloService.getNumber(num);
  }

  @Get('/active/:status')
  // ParseBoolPipe --> convierte el string a boolean
  isUserActive(@Param('status', ParseBoolPipe) status: boolean) {
    console.log(typeof status);
    return this.helloService.isUserActive(status);
  }

  @Get('/greet')
  greet(@Query(ValidateuserPipe) query: { name: string; age: number }) {
    console.log(typeof query.name, typeof query.age);
    return this.helloService.greet(query.name, query.age);
  }
}
