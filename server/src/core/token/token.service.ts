import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument } from './schemas';
import { UserDto } from '../user/dto';

@Injectable({})
export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
  ) {}
  generateTokens(payload: UserDto) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });
    return { accessToken, refreshToken };
  }

  validateAccessToken(token: string): UserDto | null {
    try {
      const userDto = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET,
      ) as UserDto;
      return userDto;
    } catch (error) {
      return null;
    }
  }
  validateRefreshToken(token: string): UserDto | null {
    try {
      const userDto = jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET,
      ) as UserDto;
      return userDto;
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    //ищем в базе
    const tokenData = await this.tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    //если условие не вып, то пользователь логинится в 1-ый раз и азписи с его id нету, нужно создать
    const token = await this.tokenModel.create({ user: userId, refreshToken });
    //после того как пользователь залогинился или зарегался, мы генерим пару токенов и сохраняем рефреш токен в бд
    return token;
  }
  async removeToken(refreshToken: string) {
    const tokenData = await this.tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }
  async findToken(refreshToken: string): Promise<Token> {
    const tokenData = await this.tokenModel.findOne({ refreshToken });
    return tokenData;
  }
}
