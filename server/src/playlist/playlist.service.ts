//libs
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { UserModelType } from './../user/interface/index';
import { Playlist, PlaylistDocument } from './schemas/playlist.schema';
import { ApiError } from './../exceptions/api-errors';
import { CreatePlaylistDto, PlaylistDto } from './dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
  ) {}
  async create(data: CreatePlaylistDto): Promise<PlaylistDto> {
    const playlist = await this.playlistModel.create(data);
    if (!playlist) {
      throw ApiError.ServerError('Произошла ошибка при создании плейлиста');
    }
    const dto = new PlaylistDto(playlist);
    return dto;
  }
  async addPlaylistToUser(user: UserModelType, id: string) {
    try {
      user.playlists = [id, ...user.playlists];
      await user.save();
      return true;
    } catch (error) {
      throw ApiError.ServerError('Произошла ошибка при создании трека');
    }
  }
  async removePlaylistFromUser(user: UserModelType, id: string) {
    try {
      user.playlists = user.playlists.filter((playlistId) => playlistId !== id);
      await user.save();
      return true;
    } catch (error) {
      throw ApiError.ServerError('Произошла ошибка при удалении трека');
    }
  }
  async getUserPlaylists(ids: string[]): Promise<PlaylistDto[]> {
    try {
      const playlists = new Array<PlaylistDto>();
      for (const id of ids) {
        const playlist = await this.playlistModel.findById(id);
        const playlistDto = new PlaylistDto(playlist);
        if (playlistDto) {
          playlists.push(playlistDto);
        }
      }
      return playlists;
    } catch (error) {
      throw ApiError.ServerError('Произошла ошибка при получении плейлистов');
    }
  }
}
