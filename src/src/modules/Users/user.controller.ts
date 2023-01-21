import { Controller, Get, HttpException, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
// import { Request } from 'express';
import { FindAllQuery, Paging } from './dto/find-all.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() query: FindAllQuery) {
    const paging: Paging = { page: query.page, pageSize: query.pageSize };
    return this.userService.findAllWithCondition(paging);
  }
}
