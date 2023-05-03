import { ApiError } from '../../helpers/exceptions/api-errors';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { ActType, FileFolder } from './interface/file.interface';

@Injectable()
export class FileService {
  createFile(act: ActType, file) {
    try {
      if (!file) {
        throw ApiError.BadRequest('Файл должен быть передан');
      }
      const folder = this.getFileFolder(act);
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', '.' + folder); //__dirname - current dirrectory,  вышли на уровень вверх и нашли static
      //проверяем наличие папки
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true }); //reqursive указывает на то, что есть папок нету, то они будут создаваться поочередно. вся вложенность
      }
      //записываем файл
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      //возвращаем путь до файла
      return folder + '/' + fileName;
    } catch (error) {
      console.log('fi leCreateError: ', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  removeFile() {
    return;
  }
  getFileFolder(act: ActType) {
    switch (act) {
      case ActType.PlaylistCover:
        return FileFolder.PLAYLIST_COVER;
      case ActType.TrackCover:
        return FileFolder.TRACK_COVER;
      case ActType.TrackAudio:
        return FileFolder.TRACK_AUDIO;
      default:
        return '';
    }
  }
}
