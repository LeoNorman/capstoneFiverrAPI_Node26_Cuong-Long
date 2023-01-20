import { Controller } from "@nestjs/common"
import { JobTypeDetailService } from "./jobTypeDetail.service";

@Controller('jobTypeDetails')
export class JobTypeDetailController {
  constructor(private readonly jobTypeDetailService: JobTypeDetailService) {}


}