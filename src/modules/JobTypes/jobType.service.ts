import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobType } from './jobType.entity';

@Injectable()
export class JobTypeService {
  constructor(
    @InjectRepository(JobType)
    private jobTypeRepository: Repository<JobType>,
  ) {}

  
}
