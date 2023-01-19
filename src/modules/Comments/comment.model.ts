import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'comments',
})
export class Comment {
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
    name: 'commented_at',
    nullable: false,
    type: 'datetime',
    default: () => 'NOW()',
  })
  commented_at: Date;

  @Column({
    name: 'content',
    nullable: false,
  })
  content: string;

  @Column({
    name: 'comment_stars',
    nullable: false,
  })
  commentStars: number;
}
