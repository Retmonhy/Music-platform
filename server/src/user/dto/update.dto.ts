import { IsEmail } from 'class-validator';

export class UpdateDto {
  firstname: string;
  surname: string;
  @IsEmail()
  email: string;
}
