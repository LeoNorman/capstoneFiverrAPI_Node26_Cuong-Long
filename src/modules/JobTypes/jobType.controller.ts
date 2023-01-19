import { Controller } from "@nestjs/common"
import { JobTypeService } from "./jobType.service";

@Controller()
export class JobTypeController {
  constructor(private readonly jobTypeService: JobTypeService) {}


}