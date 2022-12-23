import { IsEmail } from 'class-validator';

export class UserDto {
  id;
  @IsEmail()
  email;
  firstname;
  surname;
  isActivated;

  constructor(model) {
    (this.id = model._id),
      (this.email = model.email),
      (this.firstname = model.firstname),
      (this.surname = model.surname),
      (this.isActivated = model.isActivated);
  }
}
