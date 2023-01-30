import { UpdateDto } from './dto/update.dto';
import { ApiError } from './../exceptions/api-errors';
import { TokenService } from './../token/token.service';
import { MailService } from './../mail/mail.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Token, TokenDocument } from './schemas/token.schema';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { UserDto, RegistrationDto } from './dto';

export interface RegistrationResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstname: string;
    surname: string;
    isActivated: boolean;
  };
}
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    private _mailService: MailService,
    private _tokenService: TokenService,
  ) {}
  //
  //
  async registration(
    registrationDto: RegistrationDto,
  ): Promise<RegistrationResponse> {
    //ищем пользователя с таким емейлом
    try {
      // eslint-disable-next-line prefer-const
      let { email, password, firstname, surname } = registrationDto;
      email = email.toLowerCase();
      await this.userModel.deleteOne({ email }); //удалить строку
      const candidate = await this.userModel.findOne({
        email,
      });
      console.log('candidate = ', candidate);
      if (candidate) {
        throw ApiError.BadRequest(
          `Пользователь с почтовым адресом ${email} уже существует`,
        );
      }
      const hashPassword = await bcrypt.hash(password, 3);

      const activationLink = await uuid.v4(); //вернет какуюто рандомную строку
      const user = await this.userModel.create({
        email,
        firstname,
        surname,
        password: hashPassword,
        activationLink,
      });
      // await this._mailService.sendActivationMail(
      //   email,
      //   `${process.env.API_URL}/api/activate/${activationLink}`,
      // );

      const userDto = new UserDto(user);
      const tokens = await this._tokenService.generateTokens({ ...userDto });

      await this._tokenService.saveToken(userDto.id, tokens.refreshToken);

      return {
        ...tokens,
        user: userDto,
      };
    } catch (error) {
      console.error('REGISTRATION_ERROR: ', error);
      return error;
    }
    //после создания пользователя нужно отправить ему на почту сообщение с подтвержжением емайла
  }
  //
  //
  async login({
    email,
    password,
  }: RegistrationDto): Promise<RegistrationResponse> {
    const user = await this.userModel.findOne({ email: email.toLowerCase() });
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

    return { ...tokens, user: userDto };
  }
  //
  //
  async logout(refreshToken: string) {
    const token = this._tokenService.removeToken(refreshToken);
    return token;
  }
  //
  //
  async refresh(refreshToken: string): Promise<RegistrationResponse> {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    //валидируем токен, не прислали ли нам какой-то левый токен, который вовсе не наш
    const userData = this._tokenService.validateRefreshToken(refreshToken);
    //проверяем наличие в базе
    const tokenFromDB = await this._tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }
    const user = await this.userModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = await this._tokenService.generateTokens({ ...userDto });
    await this._tokenService.saveToken(user.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  //
  //
  async getUsers() {
    const users = this.userModel.find();
    return users;
  }
  //
  //
  async activate(activationLink: string) {
    const user = await this.userModel.findOne({ activationLink });
    console.log('activate = ');
    if (!user) {
      throw ApiError.BadRequest('Некорректная ссылка активации');
    }
    user.isActivated = true;
    await user.save();
    console.log('user = ', user);
    return { isSuccess: true };
  }
  //
  //
  async validateAndThrowUser(accessToken: string) {
    const user = this._tokenService.validateAccessToken(accessToken);
    if (!user) {
      throw ApiError.UnauthorizedError();
    }
    return user;
  }
  async updateUserInfo(user: UserDto, updateDto: UpdateDto) {
    const userData = await this.userModel.findOne({ id: user.id });
    if (!userData) {
      return null;
    }
    userData.email = updateDto.email;
    userData.surname = updateDto.surname;
    userData.firstname = updateDto.firstname;
    console.log('userData = ', userData);
    await userData.save();
    return new UserDto(userData);
  }
}
