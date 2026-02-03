import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/api')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/users')
  getUsers(): any[] {
    return this.userService.getUsers();
  }

  @Get('/users/:id')
  getByUser(@Param('id') id: string) {
    return this.userService.getByUser(Number(id));
  }

  @Post('/users')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }
}
