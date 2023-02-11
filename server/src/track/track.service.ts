import { ApiError } from './../exceptions/api-errors';
import { GetUserModel } from './../user/interface/index';
import { CreateTrackDto } from './dto/create-track.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Track, Comment, CommentDocument, TrackDocument } from './schemas';
import { CommentDto } from './dto';
import { FileService, FileType } from '../file';
import { ICreateTrackResponse, ICommentResponse } from './interface';
import * as mm from 'music-metadata';

interface IAudioFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
@Injectable()
export class TrackService {
  //это делается чтобы мы могли использовать наши модели в сервисе
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService,
  ) {}

  async create(
    dto: CreateTrackDto,
    picture: string,
    audio: IAudioFile,
  ): Promise<ICreateTrackResponse> {
    //чтобы создать трек нам вв эту фукцию нужно получить каккие-то данные dto
    const pictureFile = this.fileService.createFile(FileType.IMAGE, picture);
    const audioFile = this.fileService.createFile(FileType.AUDIO, audio);
    console.log('audio = ', audio);
    const metadata = await mm.parseBuffer(audio.buffer);
    console.log('metadata = ', metadata);
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      duration: Math.round(metadata.format.duration) || 0,
      picture: pictureFile,
      audio: audioFile,
    });
    return { isSuccess: true, track };
    //далее переходим в контроллер и работаем с запросом
  }

  async getAll(count = 20, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel.find().skip(offset).limit(count);
    return tracks;
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') }, //что за $regex ?
    });
    return tracks;
  }

  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');
    return track;
  }

  async delete(
    id: ObjectId,
  ): Promise<{ isSuccess: boolean; trackId: ObjectId }> {
    const deletedTrack = await this.trackModel.findByIdAndDelete(id);
    return {
      isSuccess: true,
      trackId: deletedTrack._id,
    };
  }

  async addComment(dto: CommentDto): Promise<ICommentResponse> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto }); //mongo создало тут _id
    track.comments.push(comment._id); //изменили объект track но БД еще не не знает об этом
    await track.save(); //тут оповестили БД (сохранили изменения в ней)
    return { isSuccess: true, comment };
  }

  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    track.save();
  }
  async addTrackToUser(user: GetUserModel, id: string) {
    try {
      user.tracks = [id, ...user.tracks];
      const track = await this.trackModel.findById(id);
      if (!track) {
        throw ApiError.ServerError('Данного трека больше не существует');
      }
      await user.save();
      return track;
    } catch (error) {
      throw ApiError.ServerError(error);
    }
  }
  async removeTrackFromUserMusic(user: GetUserModel, id: string) {
    try {
      user.tracks = user.tracks.filter((trackId) => trackId !== id);
      await user.save();
      return true;
    } catch (error) {
      throw ApiError.ServerError(error);
    }
  }
  async getUserMusic(ids: string[]) {
    try {
      const tracks = [];
      for (const trackId of ids) {
        if (!trackId) continue;
        const track = await this.trackModel.findById(trackId);
        if (track) {
          tracks.push(track);
        }
      }
      return tracks;
    } catch (error) {
      throw ApiError.ServerError(error);
    }
  }
}
