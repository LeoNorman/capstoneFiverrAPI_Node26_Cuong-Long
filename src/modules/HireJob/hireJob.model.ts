import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'hire_job',
})
export class HireJob {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "job_id",
    nullable: false,
  })
  jobId: number;

  @Column({
    name: 'user_id',
    nullable: false,
  })
  userId: number;

  @Column({
    name: 'hired_at',
    nullable: false,
    type: 'datetime',
    default: () => 'NOW()',
  })
  hiredAt: Date;

  @Column({
    name: 'completed',
    nullable: false,
    type: "boolean",
    default: false,
  })
  completed: boolean;
}
