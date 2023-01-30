import {
  Controller,
  Get,
  Post,
  ValidationPipe,
  HttpException,
  HttpCode,
  Query,
  Req,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { Request } from 'express';
import { FindAllQuery, Paging } from './dto/find-all.dto';
import { CreateUserDto } from './dto/create.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() query: FindAllQuery) {
    const paging: Paging = { page: query.page, pageSize: query.pageSize };
    return this.userService.findAllWithCondition(paging);
  }

  @Post('/register')
  @HttpCode(201)
  async userRegistration(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    if (!Object.keys(createUserDto).length) {
      throw new BadRequestException('missing user data');
    }

    return await this.userService.userRegistration(createUserDto);
  }
}
