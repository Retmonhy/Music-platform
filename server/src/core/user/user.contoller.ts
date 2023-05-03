import { PlaylistService } from './../playlist/playlist.service';
import { TrackService } from './../track';
import { ApiError } from '../../helpers/exceptions/api-errors';
import { AuthGuard } from '../../helpers/guards/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Next,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from '.';
import { RegistrationDto, UpdateDto } from './dto';
import { LowerCaseEmailPipe } from '../../helpers/pipes';

@Controller('/account')
export class UserController {
  constructor(
    private _userService: UserService,
    private _trackService: TrackService,
    private _playlistService: PlaylistService,
  ) {}

  @Post('/registration')
  @UsePipes(new LowerCaseEmailPipe())
  async registration(
    @Body(ValidationPipe) registrationDto: RegistrationDto,
    @Res() res: Response,
  ) {
    try {
      const userData = await this._userService.registration(registrationDto);
      if (userData) {
        res.cookie('refreshToken', userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        return res.status(200).send({ isSuccess: true, ...userData });
      }
    } catch (e) {
      console.log('/api/registration ERROR = ', e);
      return res.json({ isSuccess: false, message: e.message });
    }
  }
  @UsePipes(new LowerCaseEmailPipe())
  @Post('/login')
  async login(@Body() loginDto: RegistrationDto, @Res() res: Response) {
    try {
      const userData = await this._userService.login(loginDto);
      if (userData) {
        res.cookie('refreshToken', userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        return res.status(200).send({ isSuccess: true, ...userData });
      }
    } catch (e) {
      console.log('/api/login ERROR = ', e);
      return res.json({ isSuccess: false, message: e.message });
    }
  }

  @Post('/logout')
  logout(@Res() res: Response, @Req() req: Request) {
    const { refreshToken } = req.cookies;
    const token = this._userService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return res.status(200).json(token);
  }
  @UsePipes(new LowerCaseEmailPipe())
  @Post('/update')
  async update(
    @Query('accessToken') accessToken: string,
    @Res() res: Response,
    @Body() body: UpdateDto,
  ) {
    const validUser = await this._userService.validateAndThrowUser(accessToken);
    if (!validUser) {
      throw ApiError.UnauthorizedError();
    }
    const user = await this._userService.updateUserInfo(validUser, body);
    if (!user) {
      return res.json({
        isSuccess: false,
        user: validUser,
      });
    }

    return res.json({
      isSuccess: true,
      user,
    });
  }

  @Get('/refresh')
  async refresh(@Res() res: Response, @Req() req: Request) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await this._userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.json({ isSuccess: true, ...userData });
    } catch (e) {
      return res.json({ isSuccess: false, message: e.message });
    }
  }

  @Get('/activate/:link')
  // @Redirect(process.env.CLIENT_URL, 301)
  @Redirect('https://ya.ru', 301)
  activate(@Param() params, @Next() next) {
    try {
      this._userService.activate(params.link);
    } catch (e) {
      next(e);
      //вызывая next с ошибкой мы попадаем в мидлваре, который реаклизовали
    }
  }
  @UseGuards(AuthGuard)
  @Get('/music/add')
  async addTrackToUserMusic(
    @Query('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (!id) {
      throw ApiError.MissingParam({ id });
    }
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      const userModel = await this._userService.getUserModel(accessToken);
      if (!userModel) {
        throw ApiError.UnauthorizedError();
      }
      const track = await this._trackService.addTrackToUser(userModel, id);

      return res.json({
        isSuccess: true,
        track,
      });
    } catch (error) {
      console.log('addTrackToUserMusic error = ', error);
      throw ApiError.ServerError(error);
    }
  }
  @UseGuards(AuthGuard)
  @Delete('/music/remove')
  async removeTrackFromMyMusic(
    @Query('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (!id) {
      throw ApiError.MissingParam({ id });
    }
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      const userModel = await this._userService.getUserModel(accessToken);
      if (!userModel) {
        throw ApiError.UnauthorizedError();
      }
      const result = await this._trackService.removeTrackFromUserMusic(
        userModel,
        id,
      );
      if (result) {
        return res.json({
          isSuccess: true,
        });
      }
    } catch (error) {
      console.log('addTrackToUserMusic error = ', error);
      throw ApiError.ServerError(error);
    }
  }
  @UseGuards(AuthGuard)
  @Get('/music')
  async getUserMusic(@Req() req: Request, @Res() res: Response) {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      if (!accessToken) {
        throw ApiError.UnauthorizedError();
      }
      const userModel = await this._userService.getUserModel(accessToken);
      if (!userModel) {
        throw ApiError.UnauthorizedError();
      }
      const tracks = await this._trackService.getUserMusic(userModel.tracks);
      return res.json(tracks);
    } catch (error) {
      throw ApiError.ServerError(error);
    }
  }
}
