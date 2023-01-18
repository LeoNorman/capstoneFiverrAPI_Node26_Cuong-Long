import { Controller, Get, Req } from "@nestjs/common"
import { UserService } from "./user.service";
import { Request } from "express"

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/users")
  findAll(@Req() req: Request) {
    return "OK"
  }

}