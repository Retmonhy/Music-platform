import { ApiError } from '../../helpers/exceptions/api-errors';
import { UserService } from './../user/user.service';
import { CreateTrackDto } from './dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { ObjectId } from 'mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/tracks')
export class TrackController {
  //после описания логики всервисе пишем запрос
  constructor(
    private trackService: TrackService,
    private userService: UserService,
  ) {}
  @Post('/create')
  //это загрузка нескольких файлов сразу. Массивом
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@Body() dto: CreateTrackDto, @UploadedFiles() files) {
    const { picture, audio } = files;

    return this.trackService.create(dto, picture[0], audio[0]);
  }

  @Get('/')
  getAll(@Query('pageSize') pageSize: number, @Query('page') page: number) {
    return this.trackService.getAll(+pageSize, +page);
  }

  @Get('/search')
  async search(
    @Query('query') query: string,
    @Query('owner_id') owner_id: string,
  ) {
    if (owner_id) {
      const userModel = await this.userService.getUserModelById(owner_id);
      if (!userModel) {
        return ApiError.BadRequest('Не удалось найти пользователя');
      }
      return this.trackService.searchInUserMusic(userModel, query);
    }
    return this.trackService.search(query);
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.trackService.delete(id);
  }

  // @Post('/comment')
  // addComment(@Body() dto: CommentDto) {
  //   return this.trackService.addComment(dto);
  // }

  @Post('/listen/:id')
  listen(@Param('id') id: ObjectId) {
    return this.trackService.listen(id);
  }
}
