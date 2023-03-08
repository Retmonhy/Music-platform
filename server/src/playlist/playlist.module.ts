import { MailService } from './../mail/mail.service';
import { User, UserSchema } from './../user/schemas/user.schema';
import { Token, TokenSchema } from './../user/schemas/token.schema';
import { TokenService } from './../token/token.service';
import { UserService } from './../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { PlaylistSchema, Playlist } from './schemas/playlist.schema';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';

@Module({
  controllers: [PlaylistController],
  providers: [PlaylistService, TokenService, UserService, MailService],
  imports: [
    MongooseModule.forFeature([
      { name: Token.name, schema: TokenSchema },
      { name: User.name, schema: UserSchema },
      { name: Playlist.name, schema: PlaylistSchema },
    ]),
  ],
})
export class PlaylistModule {}
