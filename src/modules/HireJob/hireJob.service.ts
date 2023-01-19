import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HireJob } from './hireJob.model';

@Injectable()
export class HireJobService {
  constructor(
    @InjectRepository(HireJob)
    private hireJobRepository: Repository<HireJob>,
  ) {}
  
}
