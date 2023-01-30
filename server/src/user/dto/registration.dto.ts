import { IsEmail, IsNotEmpty, Length, Min, MinLength } from 'class-validator';

export class RegistrationDto {
  firstname: string;
  surname: string;
  @IsEmail({}, { message: 'Неверный емайл' })
  email: string;

  @IsNotEmpty()
  @Length(3, 32)
  password: string;
}
