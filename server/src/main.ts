import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
const start = async () => {
  try {
    config();
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(PORT, () =>
      console.log(`server have been started on port ${PORT}`),
    );
  } catch (error) {
    console.log('StartServerERROR: ', error);
  }
};
start();
