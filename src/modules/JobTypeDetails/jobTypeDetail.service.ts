import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobTypeDetail } from './jobTypeDetail.model';

@Injectable()
export class JobTypeDetailService {
  constructor(
    @InjectRepository(JobTypeDetail)
    private jobTypeDetailRepository: Repository<JobTypeDetail>,
  ) {}
}
