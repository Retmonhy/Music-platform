import { UserService } from './../user/user.service';
import { CreatePlaylistDto } from './dto';
import { ApiError } from './../exceptions/api-errors';
import { AuthGuard } from './../guards/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { PlaylistService } from './playlist.service';

@Controller('playlist')
export class PlaylistController {
  constructor(
    private _playlistService: PlaylistService,
    private _userService: UserService,
  ) {}
  @UseGuards(AuthGuard)
  @Post('/create')
  async create(
    @Req() req: Request,
    @Body() body: CreatePlaylistDto,
    @Res() res: Response,
  ) {
    const accessToken = req.headers.authorization.split(' ')[1];
    if (!accessToken) {
      return ApiError.UnauthorizedError();
    }
    const userModel = await this._userService.getUserModel(accessToken);
    if (!userModel) {
      throw ApiError.UnauthorizedError();
    }
    try {
      const playlist = await this._playlistService.create(body);
      if (playlist) {
        this._playlistService.addPlaylistToUser(userModel, playlist.id);
      }
      return res.json({ isSuccess: true, playlist });
    } catch (error) {
      return ApiError.ServerError(
        `Не удалось создать плейлист.\n${error.message}`,
      );
    }
  }
  @UseGuards(AuthGuard)
  @Get('/add:id')
  async addPlaylistToUser(
    @Req() req: Request,
    @Query('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      if (!accessToken) {
        return ApiError.UnauthorizedError();
      }
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
  @Delete('/remove:id')
  async removePlaylistFromUser(
    @Req() req: Request,
    @Query('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      if (!accessToken) {
        return ApiError.UnauthorizedError();
      }
      const userModel = await this._userService.getUserModel(accessToken);
      if (!userModel) {
        throw ApiError.UnauthorizedError();
      }
      const result = await this._playlistService.removePlaylistFromUser(
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
}
