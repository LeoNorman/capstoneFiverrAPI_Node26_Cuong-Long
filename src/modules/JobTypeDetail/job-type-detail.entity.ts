import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Job } from '../Jobs/job.entity';
import { JobType } from '../JobTypes/job-type.entity';

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

  @ManyToOne(() => JobType, (jobType) => jobType.id)
  @JoinColumn({ name: 'job_type_id' })
  jobType: JobType;

  @OneToMany(() => Job, (job) => job.jobTypeDetail)
  jobTypeDetails?: JobTypeDetail[];
}
