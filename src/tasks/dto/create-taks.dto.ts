import { IsString, IsNumber, IsOptional, MinLength } from 'class-validator';

export class Task {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  age: number;
}

export class User {
  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  age: number;
}
