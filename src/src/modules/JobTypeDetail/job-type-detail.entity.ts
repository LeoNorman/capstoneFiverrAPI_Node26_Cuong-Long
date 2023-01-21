import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
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
}
