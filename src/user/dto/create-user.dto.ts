import {
  IsDate,
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  isDefined,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDto {

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @IsOptional()
  @IsString()
  @IsEnum(Role)
  readonly role: Role

  @IsOptional()
  @IsDate()
  readonly createdAt?: Date

  @IsOptional()
  @IsDate()
  updatedAt?: Date
}
