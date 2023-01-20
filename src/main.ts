import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global middleware
  // app.use(Middleware)

  app.enableCors({
    origin: '*',
  });

  await app.listen(3000);
}
bootstrap();

// express
// Cài đặt: yarn add cors
// Sử dụng: app.use(cors())
