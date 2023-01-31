import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Global middleware
  // app.use(Middleware)

  app.enableCors({
    origin: '*',
  });

  app.useStaticAssets(join(__dirname, '..', '.'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();

// express
// Cài đặt: yarn add cors
// Sử dụng: app.use(cors())
