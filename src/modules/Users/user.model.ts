import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Job } from '../Jobs/job.model';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}

// Cần import vào array Entities của TypeOrmModule.forRoot() ở app.module.ts để nó hoạt động
// Với các services nào cần sử dụng User entity để tương tác với DB, ta sử dụng repository pattern
// - Ở module quản lý service đó, ta khai báo TypeOrmModule.forFeature([User])
// - Trong service ta dùng InjectRepository để inject nó vào bên trong service
@Entity({
  name: 'users', // Tên table
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "name",
    nullable: false,
  })
  name: string;

  @Column({
    name: 'email',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    name: "password",
    nullable: false,
  })
  password: string;

  @Column({
    name: "phone",
    nullable: false,
    unique: true,
  })
  phone: string;

  @Column({
    name: "birthday",
    nullable: false,
  })
  birthday: string;

  @Column({
    name: 'gender',
    type: 'enum',
    enum: Gender,
    default: Gender.OTHER,
  })
  gender: Gender;

  @Column({
    name: 'role',
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    name: "skill",
    nullable: false,
  })
  skill: string;

  @Column({
    name: "certification",
    nullable: true,
  })
  certification: string;

  @OneToMany(() => Job, (job) => job.user)
  jobs?: Job[]
}
