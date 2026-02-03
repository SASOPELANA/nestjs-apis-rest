import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: CreateUserDto[] = [];

  getUsers(): CreateUserDto[] {
    return this.users;
  }

  getByUser(id: number): CreateUserDto | undefined {
    const resUser = this.users.find((user) => user.id === id);

    if (!resUser) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return resUser;
  }

  createUser(user: CreateUserDto): CreateUserDto {
    this.users.push({
      ...user,
      id: this.users.length + 1,
    });

    return user;
  }
}
