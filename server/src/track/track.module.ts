import { FileService } from './../file/file.service';
import { CommentSchema, Comment, Track, TrackSchema } from './schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController], //регистрация сервиса и контроллера
  providers: [TrackService, FileService], //регистрация сервиса и контроллера
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
})
export class TrackModule {}
