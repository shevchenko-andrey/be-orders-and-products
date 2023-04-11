import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(4, 20)
  firstName: string;

  @IsString()
  @Length(4, 20)
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 20)
  password: string;
}
