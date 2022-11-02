import { IsEmail } from 'class-validator';

export class UserDto {
  id;
  @IsEmail()
  email;
  isActivated;

  constructor(model) {
    (this.id = model._id),
      (this.email = model.email),
      (this.isActivated = model.isActivated);
  }
}
