import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegistrationDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(3, 32)
  password: string;
}
