import { Controller } from "@nestjs/common"
import { HireJobService } from "./hireJob.service";

@Controller()
export class HireJobController {
  constructor(private readonly hireJobService: HireJobService) {}


}