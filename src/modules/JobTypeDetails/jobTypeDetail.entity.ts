import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Job } from '../Jobs/job.entity';
import { JobType } from '../JobTypes/jobType.entity';

@Entity({
  name: 'job_type_details',
})
export class JobTypeDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column({
    name: 'job_type_id',
  })
  jobTypeId: number;

  // Relationships
  // jobTypeDetail 1 - n jobs
  @OneToMany(() => Job, (job) => job.jobTypeDetail)
  jobs?: Job[]

  // jobTypeDetails n - 1 jobType
  @ManyToOne(() => JobType, (jobType) => jobType.jobTypeDetails) 
  @JoinColumn({ name: 'job_type_id' })
  JobType?: JobType;
}
