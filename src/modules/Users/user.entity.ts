import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Job } from '../Jobs/job.entity';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}

@Entity({
  name: 'users', // Tên table
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  birthday: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.OTHER,
  })
  gender: Gender;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column()
  skill: string;

  @Column({
    nullable: true,
  })
  certification: string;

  // Relationships
  // user 1 - n jobs
  @OneToMany(() => Job, (job) => job.user)
  jobs: Job[]

  // user 1 - n comments
  // job 1 - n comments
  // @ManyToMany(() => Job, (jobs) => jobs.users)
  // @JoinTable({
  //   name: 'comments',
  //   joinColumn: { name: 'user_id', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'job_id' },
  // })
  // jobs: Job[];

  // user 1 - n hireJob
  // job 1 - n hireJob
  // @ManyToMany(() => Job, (jobs) => jobs.users)
  // @JoinTable({
  //   name: 'hire_job',
  //   joinColumn: { name: 'user_id', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'job_id' },
  // })
  // jobs: Job[];
}
