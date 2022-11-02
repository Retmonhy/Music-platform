import { TokenService } from './../token/token.service';
import { MailService } from './../mail/mail.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './user.contoller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import { Token, TokenSchema } from './schemas/token.schema';
import { ErrorMiddleware } from './../middlewares';

@Module({
  controllers: [UserController], //регистрация сервиса и контроллера
  providers: [UserService, MailService, TokenService], //регистрация сервиса и контроллера
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
})
export class UserModule {}
