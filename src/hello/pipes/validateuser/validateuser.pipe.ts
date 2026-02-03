import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

interface UserDto {
  name?: string;
  age?: string | number;
}

@Injectable()
export class ValidateuserPipe implements PipeTransform {
  transform(value: UserDto) {
    console.log('value:', value);

    if (value.age === undefined || value.age === null) {
      throw new HttpException('Age is required', HttpStatus.BAD_REQUEST);
    }

    const ageNumber = parseInt(value.age.toString(), 10);

    if (isNaN(ageNumber)) {
      throw new HttpException('Age must be a number', HttpStatus.BAD_REQUEST);
    }

    return { ...value, age: ageNumber };
  }
}
