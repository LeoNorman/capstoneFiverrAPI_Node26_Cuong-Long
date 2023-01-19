import { Module } from '@nestjs/common';
import { JobTypeController } from './jobType.controller';
import { JobTypeService } from './jobType.service';

@Module({
  imports: [],
  controllers: [JobTypeController],
  providers: [JobTypeService],
})
export class JobTypeModule {}
