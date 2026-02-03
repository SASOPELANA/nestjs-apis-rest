import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  getHello(): string {
    return 'Hola servicios.';
  }

  getNumber(num: number): number {
    return num + 14;
  }

  isUserActive(status: boolean): boolean {
    return status;
  }

  greet(name: string, age: number): string {
    return `Hola ${name}, tienes ${age} años.`;
  }
}
