import { TrackService } from './../track';

import { ObjectId } from 'mongoose';
import { ApiError } from './../exceptions/api-errors';
import { AuthGuard } from './../guards/auth.guard';
import {
  Body,
  Controller,
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
import { Response, NextFunction, Request } from 'express';
import { UserService } from '.';
import { RegistrationDto, UpdateDto } from './dto';
import { LowerCaseEmailPipe } from './../pipes';

@Controller('/account')
export class UserController {
  constructor(
    private _userService: UserService,
    private _trackService: TrackService,
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
        return res.status(200).send(userData);
      }
    } catch (e) {
      console.log('/api/registration ERROR = ', e);
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
        return res.status(200).send(userData);
      }
    } catch (e) {
      console.log('/api/login ERROR = ', e);
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
  async refresh(
    @Res() res: Response,
    @Req() req: Request,
    @Next() next: NextFunction,
  ) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await this._userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.json(userData);
    } catch (e) {
      next(e);
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
}
