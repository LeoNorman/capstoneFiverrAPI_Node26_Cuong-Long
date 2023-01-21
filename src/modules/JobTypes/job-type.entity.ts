import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { JobTypeDetail } from '../JobTypeDetail/job-type-detail.entity';

@Entity({
  name: 'job_type',
})
export class JobType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => JobTypeDetail, (jobTypeDetail) => jobTypeDetail.jobType)
  jobTypeDetails?: JobTypeDetail[];
}
