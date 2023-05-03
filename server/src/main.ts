import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';
import { config } from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './helpers/filters/exception.filter';
const start = async () => {
  try {
    config();
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());
    //две строчки ниже для того чтобы при запросе не было ошибке об очень большой величине тела запроса
    app.use(json({ limit: '10mb' }));
    app.use(urlencoded({ limit: '50mb' }));

    app.enableCors({ credentials: true, origin: process.env.CLIENT_URL });
    app.useGlobalPipes(
      new ValidationPipe({
        enableDebugMessages: true,
        exceptionFactory: (arr) => {
          console.log('ValidationPipe error: ', arr);
          return arr;
        },
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(PORT, () =>
      console.log(`server have been started on port ${PORT}`),
    );
  } catch (error) {
    console.log('StartServerERROR: ', error);
  }
};
start();
