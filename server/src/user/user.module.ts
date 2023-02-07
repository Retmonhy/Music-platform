import { FileService } from './../file/file.service';
import { CommentSchema, Comment } from './../track/schemas/comment.schema';
import { Track, TrackSchema } from './../track/schemas/track.schema';
import { TrackService } from './../track';
import { TokenService } from './../token/token.service';
import { MailService } from './../mail/mail.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.contoller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import { Token, TokenSchema } from './schemas/token.schema';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UserController], //регистрация сервиса и контроллера
  providers: [
    UserService,
    MailService,
    TokenService,
    TrackService,
    FileService,
  ], //регистрация сервиса и контроллера
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
  ],
})
export class UserModule {}
