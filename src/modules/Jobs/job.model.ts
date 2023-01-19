import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../Users/user.model';

@Entity({
  name: 'jobs',
})
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'vote',
    nullable: false,
  })
  vote: number;

  @Column({
    name: 'salary',
    nullable: false,
  })
  salary: number;

  @Column({
    name: 'image',
    nullable: false,
  })
  image: string;

  @Column({
    name: 'description',
    nullable: false,
  })
  description: string;

  @Column({
    name: 'short_description',
    nullable: false,
  })
  shortDescription: string;

  @Column({
    name: 'job_star',
    nullable: false,
  })
  jobStar: number;

  @Column({
    name: 'job_detail_id',
    nullable: false,
  })
  jobDetailId: number;

  @Column({
    name: 'creator_id',
    nullable: false,
  })
  creatorId: number;

  @ManyToOne(() => User, (user) => user.jobs) 
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
