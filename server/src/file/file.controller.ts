import { ActType } from './interface';
import { FileService } from './file.service';
import { ApiError } from './../exceptions/api-errors';
import { Response } from 'express';
import {
  Controller,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/file')
export class FileController {
  constructor(private _fileService: FileService) {}

  @Post('/upload')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
  upload(
    @Query('act') act: ActType,
    @Res() res: Response,
    @UploadedFiles() files,
  ) {
    const { file } = files;
    if (!act) {
      return ApiError.MissingParam(act);
    }
    const path = this._fileService.createFile(act, file[0]);

    return res.json({ path });
  }
}
