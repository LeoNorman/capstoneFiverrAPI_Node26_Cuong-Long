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
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { Request } from 'express';
import { Filter, FindAllQuery, Paging } from './dto/find-all.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto';
import { Roles } from 'src/common/roles.decorators';
import { UserRole } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/roles.guard';
import { jwtAuthGuard } from '../Auth/strategies/jwt.strategy';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() query: FindAllQuery) {
    const paging: Paging = { page: query.page, pageSize: query.pageSize };
    const filter: Filter = { role: query.role, name: query.name };
    return this.userService.findAllWithCondition(paging, filter);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(jwtAuthGuard, RolesGuard)
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
    // return await this.userService.createUser(createUserDto);
    return 'OK';
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.userService.findOneWithCondition({ id });

    // Xử lý trả lỗi về cho client
    // throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    // throw new NotFoundException('user not found');
  }

  @Delete('/:id')
  @Roles(UserRole.ADMIN)
  @UseGuards(jwtAuthGuard, RolesGuard)
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
