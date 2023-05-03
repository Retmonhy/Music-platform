//helpers
import { AuthGuard } from './../../helpers/guards/auth.guard';
import { ApiError } from './../../helpers/exceptions/api-errors';
//services
import { TrackService } from './../track/track.service';
import { UserService } from './../user/user.service';
import { PlaylistService } from './playlist.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { IManagePlaylistTracksQuery } from './interfaces/playlist.interface';
import { UserDto } from '../user/dto/User.dto';
import { CreatePlaylistDto } from './dto/CreatePlaylist.dto';
import { UpdatePlaylistDto } from './dto/UpdatePlaylist.dto';

@Controller('playlist')
export class PlaylistController {
  constructor(
    private _playlistService: PlaylistService,
    private _userService: UserService,
    private _trackService: TrackService,
  ) {}
  @Get('/')
  async getPlaylists(@Req() req: Request, @Res() res: Response) {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      if (!accessToken) {
        throw ApiError.UnauthorizedError();
      }
      const userModel = await this._userService.getUserModel(accessToken);
      if (!userModel) {
        throw ApiError.UnauthorizedError();
      }
      const playlists = await this._playlistService.getPlaylistListByIds(
        userModel.playlists,
      );
      return res.json(playlists);
    } catch (error) {
      throw ApiError.ServerError(error);
    }
  }
  @Get('/all')
  async getAllPlaylists(
    @Query('pageSize') pageSize: number,
    @Query('page') page: number,
    @Res() res: Response,
  ) {
    try {
      const playlists = await this._playlistService.getAllPlaylists(
        +page,
        +pageSize,
      );
      return res.json(playlists);
    } catch (error) {
      throw ApiError.ServerError(error);
    }
  }
  @UseGuards(AuthGuard)
  @Post('/create')
  async create(
    @Req() req: Request,
    @Body() body: Omit<CreatePlaylistDto, 'owner'>,
    @Res() res: Response,
  ) {
    const accessToken = req.headers.authorization.split(' ')[1];
    const userModel = await this._userService.getUserModel(accessToken);
    if (!userModel) {
      throw ApiError.UnauthorizedError();
    }
    const owner = new UserDto(userModel);
    const playlistInfo: CreatePlaylistDto = {
      owner,
      ...body,
    };

    try {
      const playlist = await this._playlistService.create(playlistInfo);
      if (playlist) {
        await this._playlistService.addPlaylistToUser(userModel, playlist.id);
      }
      return res.json({ isSuccess: true, playlist });
    } catch (error) {
      return ApiError.ServerError(
        `Не удалось создать плейлист.\n${error.message}`,
      );
    }
  }
  @UseGuards(AuthGuard)
  @Post('/delete')
  async delete(
    @Req() req: Request,
    @Body('id') id: string,
    @Res() res: Response,
  ) {
    const accessToken = req.headers.authorization.split(' ')[1];
    const userModel = await this._userService.getUserModel(accessToken);
    if (!userModel) {
      throw ApiError.UnauthorizedError();
    }

    try {
      const deleteResult = await this._playlistService.delete(id);
      await this._userService.deletePlaylistFromAllUsers(id);
      if (deleteResult.isSuccess) {
        return res.json(deleteResult);
      }
    } catch (error) {
      return res.json(error);
    }
  }
  @UseGuards(AuthGuard)
  @Post('/update')
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Query('id') id: string,
    @Body() body: UpdatePlaylistDto,
  ) {
    const accessToken = req.headers.authorization.split(' ')[1];
    const userModel = await this._userService.getUserModel(accessToken);
    if (!userModel) {
      throw ApiError.UnauthorizedError();
    }
    const playlist = await this._playlistService.updatePlaylist(id, body);

    return res.json({ isSuccess: true, playlist });
  }
  @UseGuards(AuthGuard)
  @Post('/add')
  async addPlaylistToUser(
    @Req() req: Request,
    @Query('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      const userModel = await this._userService.getUserModel(accessToken);
      if (!userModel) {
        throw ApiError.UnauthorizedError();
      }
      const result = await this._playlistService.addPlaylistToUser(
        userModel,
        id,
      );
      if (result) {
        return res.json({ isSuccess: true });
      }
    } catch (error) {
      throw ApiError.ServerError('Что-то пошло не так');
    }
  }
  @UseGuards(AuthGuard)
  @Post('/remove')
  async removePlaylistsFromUser(
    @Req() req: Request,
    @Body() body: { ids: string[] },
    @Res() res: Response,
  ) {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      const userModel = await this._userService.getUserModel(accessToken);
      if (!userModel) {
        throw ApiError.UnauthorizedError();
      }
      const result = await this._playlistService.removePlaylistsFromUser(
        userModel,
        body.ids,
      );
      if (result) {
        return res.json({ isSuccess: true });
      }
    } catch (error) {
      throw ApiError.ServerError('Что-то пошло не так');
    }
  }
  @Get('/tracks')
  async getPlaylistTracks(
    @Req() req: Request,
    @Query('id') id: string,
    @Res() res: Response,
  ) {
    try {
      if (!id) {
        return ApiError.MissingParam(id);
      }
      const tracks_ids = await this._playlistService.getPlaylistTracks(id);
      const tracks = await this._trackService.getMany(tracks_ids);
      return res.json(tracks);
    } catch (error) {
      throw ApiError.ServerError(error);
    }
  }
  @UseGuards(AuthGuard)
  @Post('/tracks/manage')
  //удалить, в случае наличия, или добавить трек, в случае отсутсвия
  async managePlaylistTracks(
    @Req() req: Request,
    @Query() query: IManagePlaylistTracksQuery,
    @Res() res: Response,
  ) {
    try {
      const { playlistId, trackId, action } = query;
      if (!playlistId) return ApiError.MissingParam(playlistId);
      if (!trackId) return ApiError.MissingParam(trackId);

      const accessToken = req.headers.authorization.split(' ')[1];
      const userModel = await this._userService.getUserModel(accessToken);
      if (!userModel) {
        throw ApiError.UnauthorizedError();
      }
      const playlist = await this._playlistService.managePlaylistTracks(
        playlistId,
        trackId,
        action,
      );
      return res.json(playlist);
    } catch (error) {
      return ApiError.ServerError(
        'Что-то пошло не так при создании / удалении трека из плейлиста',
      );
    }
  }
}
