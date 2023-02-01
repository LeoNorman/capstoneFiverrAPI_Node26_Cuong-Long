import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../Users/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    // Setup sử dụng JWT bên trong các services được quản lý bởi AuthModule
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('SECRET_KEY'),
        signOptions: {
          expiresIn: '12h',
        },
      }),
      inject: [ConfigService],
    }),

    //Setup sử dụng Passport bên trong các services được quản lý bởi AuthModule
    PassportModule,

    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(
            null,
            req.originalUrl === '/auth/register'
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

    // Khai báo cho phép sử dụng User entity trong các services do AuthModule quản lý
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
