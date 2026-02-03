// validación de datos
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Max(100)
  age: number;
}
