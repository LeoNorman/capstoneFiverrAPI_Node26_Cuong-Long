import { Module } from '@nestjs/common';
import { JobTypeDetailController } from './job-type-detail.controller';
import { JobTypeDetailService } from './job-type-detail.service';

@Module({
  controllers: [JobTypeDetailController],
  providers: [JobTypeDetailService]
})
export class JobTypeDetailModule {}
