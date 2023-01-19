import { Controller } from "@nestjs/common"
import { JobTypeDetailService } from "./jobTypeDetail.service";

@Controller()
export class JobTypeDetailController {
  constructor(private readonly jobTypeDetailService: JobTypeDetailService) {}


}