import { ManageTracksAction } from './interfaces/playlist.interface';
//libs
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { UserModelType } from '../user/interface/user.interface.';
import { Playlist, PlaylistDocument } from './schemas/playlist.schema';
import { ApiError } from '../../helpers/exceptions/api-errors';
import { CreatePlaylistDto, PlaylistDto, UpdatePlaylistDto } from './dto';

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

  async delete(id: string) {
    try {
      const result = await this.playlistModel.deleteOne({ id });
      //надо чистить привязки. Нужно удалить этот плейлист у всех пользователей, у которых он был
      return { isSuccess: result.deletedCount > 0 };
    } catch (error) {
      throw ApiError.ServerError('Произошла ошибка при удалении трека');
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

  async removePlaylistsFromUser(user: UserModelType, ids: string[]) {
    try {
      ids.forEach((id) => {
        user.playlists = user.playlists.filter((i) => i !== id);
      });
      await user.save();
      return true;
    } catch (error) {
      throw ApiError.ServerError('Произошла ошибка при удалении трека');
    }
  }
  async getPlaylistListByIds(ids: string[]): Promise<PlaylistDto[]> {
    try {
      const playlists = new Array<PlaylistDto>();
      for (const id of ids) {
        const playlist = await this.playlistModel.findById(id);
        if (!playlist) continue;
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
  //надо сделать пейджинг
  async getAllPlaylists(page: number, pageSize: number) {
    try {
      const offset = pageSize * page;
      const playlists = await this.playlistModel
        .find()
        .skip(offset)
        .limit(pageSize);
      return playlists.map((pl) => new PlaylistDto(pl));
    } catch (e) {
      throw ApiError.ServerError(
        'Произошла ошибка при получении всех плейлистов',
      );
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
  async managePlaylistTracks(
    id: string,
    trackId: string,
    action: ManageTracksAction,
  ) {
    try {
      const playlistModel = await this.playlistModel.findById(id);
      if (!playlistModel) {
        throw ApiError.ServerError('Плейлист не найден');
      }
      if (action == ManageTracksAction.Remove) {
        playlistModel.tracks = playlistModel.tracks.filter(
          (i) => i !== trackId,
        );
      }
      if (action == ManageTracksAction.Add) {
        playlistModel.tracks = [trackId, ...playlistModel.tracks];
      }

      await playlistModel.save();
      return new PlaylistDto(playlistModel);
    } catch (error) {
      throw ApiError.ServerError('Не удалось добавить трек в плейлист');
    }
  }
}
