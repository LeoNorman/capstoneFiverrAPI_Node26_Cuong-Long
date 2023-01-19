import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'job_type_details',
})
export class JobTypeDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "name",
    nullable: false,
  })
  name: string;

  @Column({
    name: 'image',
    nullable: false,
  })
  image: string;

  @Column({
    name: 'job_type_id',
    nullable: false,
  })
  jobTypeId: number;
}
