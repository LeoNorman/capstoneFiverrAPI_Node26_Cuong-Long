import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { JobTypeDetail } from '../JobTypeDetails/jobTypeDetail.entity';

@Entity({
  name: 'job_type',
})
export class JobType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  // Relationships
  // jobType 1 - n jobTypeDetails
  @OneToMany(() => JobTypeDetail, (jobTypeDetail) => jobTypeDetail.JobType)
  jobTypeDetails?: JobTypeDetail[]

}
