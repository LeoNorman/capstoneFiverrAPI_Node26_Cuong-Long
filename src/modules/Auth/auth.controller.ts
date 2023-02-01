import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  UseInterceptors,
  HttpCode,
  ValidationPipe,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';

import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from '../Users/dto';
import { jwtAuthGuard } from './strategies/jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(201)
  async userRegistration(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 100000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    if (!Object.keys(createUserDto).length) {
      throw new BadRequestException('missing user data');
    }
    if (file) {
      console.log('file: ', file);
      file.path = file.path.replace(/\\/g, '/'); // Đối với window

      createUserDto.avatar = `http://localhost:3000/${file.path}`;
    }
    return await this.authService.userRegistration(createUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('/profile')
  @UseGuards(jwtAuthGuard)
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
