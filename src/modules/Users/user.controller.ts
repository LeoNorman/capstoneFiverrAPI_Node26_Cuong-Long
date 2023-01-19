import { Controller, Get, HttpException, Req } from "@nestjs/common"
import { UserService } from "./user.service";
import { Request } from "express"

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}


}