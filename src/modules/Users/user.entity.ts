import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Job } from '../Jobs/job.entity';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

@Entity({
  name: 'users', // Tên table
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    unique: true,
  })
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
  @OneToMany(() => Job, (job) => job.creater)
  jobs: Job[];
}
