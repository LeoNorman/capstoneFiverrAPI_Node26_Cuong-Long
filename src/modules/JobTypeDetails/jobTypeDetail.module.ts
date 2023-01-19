import { Module } from '@nestjs/common';
import { JobTypeDetailController } from './jobTypeDetail.controller';
import { JobTypeDetailService } from './jobTypeDetail.service';

@Module({
  imports: [],
  controllers: [JobTypeDetailController],
  providers: [JobTypeDetailService],
})
export class JobTypeDetailModule {}
