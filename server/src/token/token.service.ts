import { UserDto } from './../user/dto/user.dto';
import { Token, TokenDocument } from './../user/schemas/token.schema';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
    console.log('accessToken = ', accessToken);
    return { accessToken, refreshToken };
  }
  async saveToken(userId, refreshToken) {
    //ищем в базе
    const tokenData = await this.tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    //если условие не вып, то пользователь логинится в 1-ый раз и азписи с его id нету, нужно создать
    const token = await this.tokenModel.create({ user: userId, refreshToken });
    console.log('token = ', token);
    //после того как пользователь залогинился или зарегался, мы генерим пару токенов и сохраняем рефреш токен в бд
    return token;
  }
}
