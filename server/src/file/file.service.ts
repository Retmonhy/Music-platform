import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { FileType } from './interface';

@Injectable()
export class FileService {
  createFile(type: FileType, file) {
    try {
      const fileExtension = file.originalname.split('.').pop();
      console.log('fileExtension = ', fileExtension);

      const fileName = uuid.v4() + '.' + fileExtension;
      console.log('fileName = ', fileName);

      const filePath = path.resolve(__dirname, '../', 'static', type); //__dirname - current dirrectory,  вышли на уровень вверх и нашли static
      console.log('filePath = ', filePath);

      //проверяем наличие папки
      if (!fs.existsSync(filePath)) {
        console.log('fs.existsSync(filePath) not exist');

        fs.mkdirSync(filePath, { recursive: true }); //reqursive указывает на то, что есть папок нету, то они будут создаваться поочередно. вся вложенность
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (error) {
      console.log('fi leCreateError: ', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  removeFile() {
    return;
  }
}
