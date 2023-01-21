import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Job } from '../Jobs/job.entity';
import { User } from '../Users/user.entity';

@Entity({
  name: 'hire_job',
})
export class HireJob {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'hired_at',
    nullable: false,
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  hiredAt: Date;

  @Column({
    name: 'completed',
    nullable: false,
    type: 'boolean',
    default: false,
  })
  completed: boolean;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User[];

  @ManyToOne(() => Job, (job) => job.id)
  @JoinColumn({ name: 'job_id' })
  job: Job;
}
