import { Module } from '@nestjs/common';
import { HireJobController } from './hireJob.controller';
import { HireJobService } from './hireJob.service';

@Module({
  imports: [],
  controllers: [HireJobController],
  providers: [HireJobService],
})
export class HireJobModule {}
