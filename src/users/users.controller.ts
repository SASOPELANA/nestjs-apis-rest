import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/api')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/users')
  async getUsers(): Promise<any[]> {
    return this.userService.getUsers();
  }

  @Get('/users/:id')
  async getByUser(@Param('id') id: string) {
    return this.userService.getByUser(id);
  }

  @Post('/users')
  async createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }
}
