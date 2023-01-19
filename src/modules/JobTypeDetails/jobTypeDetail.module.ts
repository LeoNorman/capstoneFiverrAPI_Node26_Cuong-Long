import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobTypeDetailController } from './jobTypeDetail.controller';
import { JobTypeDetail } from './jobTypeDetail.model';
import { JobTypeDetailService } from './jobTypeDetail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobTypeDetail]),
  ],
  controllers: [JobTypeDetailController],
  providers: [JobTypeDetailService],
})
export class JobTypeDetailModule {}
