import {
  Body,
  Controller,
  Get,
  Next,
  Param,
  Post,
  Redirect,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { RegistrationDto } from './dto';
import { UserService } from './user.service';

@Controller('/api')
export class UserController {
  constructor(private _userService: UserService) {}

  @Post('/registration')
  async registration(
    @Body(ValidationPipe) registrationDto: RegistrationDto,
    @Next() next: NextFunction,
    @Res() res: Response,
  ) {
    try {
      const userData = await this._userService.registration(registrationDto);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return userData;
    } catch (e) {
      next(e);
      //вызывая next с ошибкой мы попадаем в мидлваре, который реаклизовали
    }
  }

  @Post('/login')
  login(@Body() loginDto: RegistrationDto, @Next() next: NextFunction) {
    this._userService.login(loginDto);
  }
  @Post('/logout')
  logout() {
    return 'q';
  }
  @Get('/refresh')
  refresh() {
    return 'q';
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
  @Get('/users')
  getUsers(@Next() next: NextFunction) {
    try {
      const users = this._userService.getUsers();
      return users;
    } catch (e) {
      next(e);
      //вызывая next с ошибкой мы попадаем в мидлваре, который реаклизовали
    }
  }
}
