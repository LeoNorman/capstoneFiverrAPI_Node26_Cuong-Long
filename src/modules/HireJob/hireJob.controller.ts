import { Controller } from "@nestjs/common"
import { HireJobService } from "./hireJob.service";

@Controller('hireJob')
export class HireJobController {
  constructor(private readonly hireJobService: HireJobService) {}


}