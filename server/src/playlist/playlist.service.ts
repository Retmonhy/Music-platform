import { UpdatePlaylistDto } from './dto/update-playlist.dto';
//libs
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { UserModelType } from './../user/interface/index';
import { Track } from './../track/schemas';
import { Playlist, PlaylistDocument } from './schemas/playlist.schema';
import { ApiError } from './../exceptions/api-errors';
import { CreatePlaylistDto, PlaylistDto } from './dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
  ) {}
  async create(data: CreatePlaylistDto): Promise<PlaylistDto> {
    try {
      const playlist = await this.playlistModel.create(data);
      if (!playlist) {
        throw ApiError.ServerError('Произошла ошибка при создании плейлиста');
      }
      const dto = new PlaylistDto(playlist);
      return dto;
    } catch (error) {
      throw ApiError.ServerError(error.message);
    }
  }
  async updatePlaylist(id: string, data: UpdatePlaylistDto) {
    const playlistModel = await this.playlistModel.findById(id);
    if (!playlistModel) {
      throw ApiError.ServerError('Не удалось найти данный плейлист');
    }
    playlistModel.name = data.name;
    playlistModel.description = data.description;
    playlistModel.cover = data.cover;
    playlistModel.tracks = data.tracks;
    await playlistModel.save();
    return new PlaylistDto(playlistModel);
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
  async getPlaylistTracks(id: string): Promise<string[]> {
    try {
      const playlistModel = await this.playlistModel.findById(id);
      if (!playlistModel) {
        throw ApiError.ServerError('Плейлист не найден');
      }
      return playlistModel.tracks;
    } catch (error) {
      throw ApiError.ServerError('Произошла ошибка при получении треков');
    }
  }
  //удалить, в случае наличия, или добавить трек, в случае отсутсвия
  async managePlaylistTracks(id: string, trackId: string) {
    try {
      const playlistModel = await this.playlistModel.findById(id);
      if (!playlistModel) {
        throw ApiError.ServerError('Плейлист не найден');
      }
      if (playlistModel.tracks.findIndex((i) => trackId === i) >= 0) {
        playlistModel.tracks.filter((i) => i !== trackId);
      } else {
        playlistModel.tracks = [trackId, ...playlistModel.tracks];
      }
      await playlistModel.save();
      return new PlaylistDto(playlistModel);
    } catch (error) {
      throw ApiError.ServerError('Не удалось добавить трек в плейлист');
    }
  }
}
