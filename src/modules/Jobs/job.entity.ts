import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../Users/user.entity';

@Entity({
  name: 'jobs', // Tên table
})
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  vote: number;

  @Column()
  price: number;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column({
    name: 'short_description',
  })
  shortDescription: string;

  @Column({
    name: 'job_star',
  })
  jobStar: number;

  @Column({
    name: 'job_detail_id',
  })
  jobDetailId: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'creater_id' })
  creater: User;
}
