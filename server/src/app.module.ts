// import { FileModule } from './file';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackModule } from './track';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileModule } from './file';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
console.log('__dirname = ', __dirname);
@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(process.env.DB_MONGOOSE),
    TrackModule,
    FileModule,
    UserModule,
  ], //модуль должен знать об используемых модулях
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //сюда надо вставлять мидлеваре
  }
}

//Чтобы воспользоваться нашими моделями в сервисах, контроллерах и тд, нужно
