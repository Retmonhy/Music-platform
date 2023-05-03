//services
import { FileService } from '../file/file.service';
import { PlaylistService } from './../playlist/playlist.service';
import { TokenService } from '../token/token.service';
import { TrackService } from './../track';
import { MailService } from '../mail/mail.service';
import { UserService } from './user.service';
//schemas
import {
  Playlist,
  PlaylistSchema,
} from './../playlist/schemas/playlist.schema';
import { CommentSchema, Comment } from './../track/schemas/comment.schema';
import { Track, TrackSchema } from './../track/schemas/track.schema';
import { User, UserSchema } from './schemas/user.schema';
import { Token, TokenSchema } from '../token/schemas/token.schema';
import { Module } from '@nestjs/common';
//controllers
import { UserController } from './user.contoller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [UserController], //регистрация сервиса и контроллера
  providers: [
    UserService,
    MailService,
    TokenService,
    TrackService,
    FileService,
    PlaylistService,
  ], //регистрация сервиса и контроллера
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([
      { name: Playlist.name, schema: PlaylistSchema },
    ]),
  ],
})
export class UserModule {}
