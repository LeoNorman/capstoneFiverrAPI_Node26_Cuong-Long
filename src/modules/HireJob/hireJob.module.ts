import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HireJobController } from './hireJob.controller';
import { HireJob } from './hireJob.model';
import { HireJobService } from './hireJob.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HireJob]),
  ],
  controllers: [HireJobController],
  providers: [HireJobService],
})
export class HireJobModule {}
