import {
  Controller,
  Get,
  Post,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpCode,
  Query,
  Req,
  Body,
  HttpStatus,
  BadRequestException,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { Request } from 'express';
import { Filter, FindAllQuery, Paging } from './dto/find-all.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() query: FindAllQuery) {
    const paging: Paging = { page: query.page, pageSize: query.pageSize };
    const filter: Filter = { role: query.role, name: query.name };
    return this.userService.findAllWithCondition(paging, filter);
  }

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
    return await this.userService.userRegistration(createUserDto);
  }
}
