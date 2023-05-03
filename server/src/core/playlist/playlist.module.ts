import { TrackService } from './../track/track.service';
import { FileService } from '../file/file.service';
import { MailService } from '../mail/mail.service';
import { User, UserSchema } from './../user/schemas/user.schema';
import { Token, TokenSchema } from '../token/schemas/token.schema';
import { Track, TrackSchema } from './../track/schemas/track.schema';
import { TokenService } from '../token/token.service';
import { UserService } from './../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { PlaylistSchema, Playlist } from './schemas/playlist.schema';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';

@Module({
  controllers: [PlaylistController],
  providers: [
    PlaylistService,
    TokenService,
    UserService,
    MailService,
    TrackService,
    FileService,
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Token.name, schema: TokenSchema },
      { name: User.name, schema: UserSchema },
      { name: Playlist.name, schema: PlaylistSchema },
      { name: Track.name, schema: TrackSchema },
    ]),
  ],
})
export class PlaylistModule {}
