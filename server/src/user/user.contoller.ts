import { ApiError } from './../exceptions/api-errors';
import { AuthGuard } from './../guards/auth.guard';
import {
  Body,
  Controller,
  Get,
  Next,
  Param,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Response, NextFunction, Request } from 'express';
import { UserService } from '.';
import { RegistrationDto } from './dto';

@Controller('/api')
export class UserController {
  constructor(private _userService: UserService) {}

  @Post('/registration')
  async registration(
    @Body(ValidationPipe) registrationDto: RegistrationDto,
    @Res() res: Response,
  ) {
    console.log('registrationDto = ', registrationDto);
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

  @Post('/login')
  login(@Body() loginDto: RegistrationDto) {
    return this._userService.login(loginDto);
  }

  @Post('/logout')
  logout(@Res() res: Response, @Req() req: Request) {
    const { refreshToken } = req.cookies;
    const token = this._userService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return res.status(200).json(token);
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
  @Get('/users')
  async getUsers(@Next() next: NextFunction) {
    try {
      const users = await this._userService.getUsers();
      return users;
    } catch (e) {
      next(e);
      //вызывая next с ошибкой мы попадаем в мидлваре, который реаклизовали
    }
  }
}
