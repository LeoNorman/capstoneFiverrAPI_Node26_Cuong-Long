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
  name: 'comments',
})
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'commented_at',
    type: 'datetime',
    default: () => 'NOW()',
  })
  commented_at: Date;

  @Column()
  content: string;

  @Column({
    name: 'comment_stars',
  })
  commentStars: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User[];

  @ManyToOne(() => Job, (job) => job.id)
  @JoinColumn({ name: 'job_id' })
  job: Job;
}
