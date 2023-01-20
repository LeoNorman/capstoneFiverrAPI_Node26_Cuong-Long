import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { JobTypeDetail } from '../JobTypeDetails/jobTypeDetail.entity';
import { User } from '../Users/user.entity';

@Entity({
  name: 'jobs',
})
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  vote: number;

  @Column()
  salary: number;

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

  @Column({
    name: 'creator_id',
  })
  creatorId: number;

  // Relationships
  // jobs n - 1 user
  @ManyToOne(() => User, (user) => user.jobs)
  @JoinColumn({ name: 'creator_id' })
  user: User;

  // jobs n - 1 jobTypeDetail
  @ManyToOne(() => JobTypeDetail, (jobTypeDetail) => jobTypeDetail.jobs)
  @JoinColumn({ name: 'job_detail_id' })
  jobTypeDetail?: JobTypeDetail;

  // job 1 - n comments
  // user 1 - n comments
  // @ManyToMany(() => User, (users) => users.jobs)
  // @JoinTable({
  //   name: 'comments',
  //   joinColumn: { name: 'job_id', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'user_id' },
  // })
  // users: User[];

  // job 1 - n hireJob
  // user 1 - n hireJob
  // @ManyToMany(() => User, (users) => users.jobs)
  // @JoinTable({
  //   name: 'hire_job',
  //   joinColumn: { name: 'job_id', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'user_id' },
  // })
  // users: User[];
}
