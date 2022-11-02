import { ApiError } from './../exceptions/api-errors';
import { TokenService } from './../token/token.service';
import { MailService } from './../mail/mail.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Token, TokenDocument } from './schemas/token.schema';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { UserDto, RegistrationDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    private _mailService: MailService,
    private _tokenService: TokenService,
  ) {}

  async registration(registrationDto: RegistrationDto) {
    //ищем пользователя с таким емейлом
    const { email, password } = registrationDto;
    const candidate = await this.userModel.findOne({ email });
    await this.userModel.deleteOne({ email });
    if (candidate) {
      // throw ApiError.BadRequest(
      //   `Пользователь с почтовым адресом ${email} уже существует`,
      // );
      this.userModel.deleteOne({ email });
    }
    const hashPassword = await bcrypt.hash(password, 3);
    console.log('hashPassword');

    const activationLink = await uuid.v4(); //вернет какуюто рандомную строку
    console.log('activationLink');
    const user = await this.userModel.create({
      email,
      password: hashPassword,
      activationLink,
    });
    await this._mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`,
    );
    console.log('this._mailService.sendActivationMail');

    const userDto = new UserDto(user);
    const tokens = await this._tokenService.generateTokens({ ...userDto });
    console.log('tokens');

    await this._tokenService.saveToken(userDto.id, tokens.refreshToken);
    console.log('this._tokenService.saveToken');

    return {
      ...tokens,
      userDto,
    };

    //после создания пользователя нужно отправить ему на почту сообщение с подтвержжением емайла
  }
  async login({ email, password }: RegistrationDto) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest('Пользователя с такой почтой не существует');
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      throw ApiError.BadRequest('Неверное имя пользователя или пароль');
    }
    const userDto = new UserDto(user);
    const tokens = this._tokenService.generateTokens({ ...userDto });

    await this._tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { tokens, user: userDto };
  }
  async getUsers() {
    const users = this.userModel.find();
    return users;
  }
  async activate(activationLink: string) {
    const user = await this.userModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('Некорректная ссылка активации');
    }
    user.isActivated = true;
    await user.save();
    console.log('user = ', user);
    return { isSuccess: true };
  }
}
