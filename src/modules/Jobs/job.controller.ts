import { Controller } from "@nestjs/common"
import { JobService } from "./job.service";

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}


}