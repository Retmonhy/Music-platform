// import { FileModule } from './file';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackModule } from './track';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileModule } from './file';
@Module({
  controllers: [],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://music-database:music-database@cluster0.dzsl5gu.mongodb.net/?retryWrites=true&w=majority',
    ),
    TrackModule,
    FileModule,
  ], //модуль должен знать об используемых модулях
})
export class AppModule {}

//Чтобы воспользоваться нашими моделями в сервисах, контроллерах и тд, нужно
