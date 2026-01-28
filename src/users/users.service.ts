import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private user = [
    {
      id: 1,
      name: 'Jhons Aimar',
      phone: '2154789',
    },
    {
      id: 2,
      name: 'seregio safklsafkj',
      phone: '215254789',
    },
  ];

  getUsers() {
    return this.user;
  }
}
