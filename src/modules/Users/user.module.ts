import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(
            null,
            req.originalUrl === '/users/register'
              ? './statics/avatar'
              : './statics/upload',
          );
        },
        filename: (req, file, callback) => {
          const prefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${prefix}-${file.originalname}`);
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
