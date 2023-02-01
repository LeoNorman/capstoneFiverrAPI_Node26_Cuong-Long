import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  AfterInsert,
} from 'typeorm';
import { Job } from '../Jobs/job.entity';
import * as bcrypt from 'bcrypt';
import { Gender, UserRole } from './dto/user.dto';

@Entity({
  name: 'users', // Tên table
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    select: false,
  })
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

  @Column({
    nullable: true,
  })
  skill: string;

  @Column({
    nullable: true,
  })
  certification: string;

  @OneToMany(() => Job, (job) => job.creater)
  jobs: Job[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(password: string) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(password || this.password, salt);
  }

  @AfterInsert()
  deletePassword() {
    delete this.password;
  }
}
