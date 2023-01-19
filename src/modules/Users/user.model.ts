import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
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
    default: Gender.MALE,
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
}
