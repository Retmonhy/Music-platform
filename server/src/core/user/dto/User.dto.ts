import { IsEmail } from 'class-validator';

export class UserDto {
  id: string;
  @IsEmail()
  email: string;
  firstname: string;
  surname: string;
  isActivated: boolean;
  tracks: string[];

  constructor(model) {
    this.id = model._id;
    this.email = model.email;
    this.firstname = model.firstname;
    this.surname = model.surname;
    this.isActivated = model.isActivated;
    this.tracks = model.tracks;
  }
}
