import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//schemas
import { User, UserSchema } from './../user/schemas/user.schema';
import { Token, TokenSchema } from '../token/schemas/token.schema';
import { CommentSchema, Comment, Track, TrackSchema } from './schemas';
//services
import { TrackService } from './track.service';
import { FileService } from '../file/file.service';
import { UserService } from './../user/user.service';
import { TokenService } from '../token/token.service';
import { MailService } from '../mail/mail.service';
//controller
import { TrackController } from './track.controller';

@Module({
  controllers: [TrackController], //регистрация сервиса и контроллера
  providers: [
    TrackService,
    FileService,
    UserService,
    TokenService,
    MailService,
  ], //регистрация сервиса и контроллера
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class TrackModule {}
