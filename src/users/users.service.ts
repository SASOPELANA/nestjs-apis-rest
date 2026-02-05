import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<UserResponseDto[]> {
    return this.prisma.user.findMany();
  }

  async getByUser(id: string): Promise<UserResponseDto> {
    const resUser = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!resUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return resUser;
  }

  async createUser(user: CreateUserDto): Promise<UserResponseDto> {
    return this.prisma.user.create({ data: user });
  }
}
