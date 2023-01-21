import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Users/user.entity';
import { PassportModule } from '@nestjs/passport';
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

    // Khai báo cho phép sử dụng User entity trong các services do AuthModule quản lý
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
