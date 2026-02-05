// validación de datos
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNumber()
  @Max(100)
  age: number;
}
