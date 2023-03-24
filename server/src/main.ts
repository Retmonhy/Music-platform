import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/exception.filter';
const start = async () => {
  try {
    config();
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());
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
