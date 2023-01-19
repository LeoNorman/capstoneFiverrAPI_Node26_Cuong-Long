import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'job_type',
})
export class JobType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "name",
    nullable: false,
  })
  name: string;

}
