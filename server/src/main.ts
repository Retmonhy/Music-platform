import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(PORT, () =>
      console.log(`server have been started on port ${PORT}`),
    );
  } catch (error) {
    console.log('StartServerERROR: ', error);
  }
};
start();
