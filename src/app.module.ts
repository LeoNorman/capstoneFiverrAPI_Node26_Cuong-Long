import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Comment } from './modules/Comments/comment.model';
import { HireJob } from './modules/HireJob/hireJob.model';
import { Job } from './modules/Jobs/job.model';
import { JobTypeDetail } from './modules/JobTypeDetails/jobTypeDetail.model';
import { JobType } from './modules/JobTypes/jobType.model';
import { User } from './modules/Users/user.model';
import { UserModule } from './modules/Users/user.module';

// Khai báo DB connection
const AppDataSource = TypeOrmModule.forRoot({
    type: 'mysql',
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "demo",
    synchronize: true,
    entities: [User, Job, HireJob, Comment, JobTypeDetail, JobType],
});

@Module({
  imports: [AppDataSource, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
