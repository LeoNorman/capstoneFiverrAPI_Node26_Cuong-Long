import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'comments',
})
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "job_id",
  })
  jobId: number;

  @Column({
    name: 'user_id',
  })
  userId: number;

  @Column({
    name: 'commented_at',
    type: 'datetime',
    default: () => 'NOW()',
  })
  commented_at: Date;

  @Column()
  content: string;

  @Column({
    name: 'comment_stars',
  })
  commentStars: number;
}
