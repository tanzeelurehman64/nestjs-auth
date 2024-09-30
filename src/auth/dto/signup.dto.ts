/* eslint-disable prettier/prettier */
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @MinLength(50)
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @Matches(/[a-zA-Z]/, { message: 'Password must contain at least 1 letter.' })
  @Matches(/\d/, { message: 'Password must contain at least 1 number.' })
  @Matches(/[!@#$%^&*(),.?":{}|<>]/, {
    message: 'Password must contain at least 1 special character.',
  })
  password: string;
}
