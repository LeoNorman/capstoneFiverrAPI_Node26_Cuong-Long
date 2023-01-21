import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/Auth/auth.module';
import { Comment } from './modules/Comments/comment.entity';
import { CommentModule } from './modules/Comments/comment.module';
import { HireJob } from './modules/HireJob/hire-job.entity';
import { HireJobModule } from './modules/HireJob/hire-job.module';
import { Job } from './modules/Jobs/job.entity';
import { JobModule } from './modules/Jobs/job.module';
import { JobTypeDetail } from './modules/JobTypeDetail/job-type-detail.entity';
import { JobTypeDetailModule } from './modules/JobTypeDetail/job-type-detail.module';
import { JobType } from './modules/JobTypes/job-type.entity';
import { JobTypeModule } from './modules/JobTypes/job-type.module';

import { User } from './modules/Users/user.entity';
import { UserModule } from './modules/Users/user.module';

// Khai báo DB connection
const AppDataSource = TypeOrmModule.forRootAsync({
  useFactory: (config: ConfigService) => ({
    type: 'mysql',
    host: config.get('MYSQL_HOST'),
    port: config.get('MYSQL_PORT'),
    username: config.get('MYSQL_USER'),
    password: config.get('MYSQL_PASSWORD'),
    database: config.get('MYSQL_DATABASE'),
    synchronize: true,
    entities: [User, Job, HireJob, Comment, JobType, JobTypeDetail],
  }),
  inject: [ConfigService],
});

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AppDataSource,
    //Internal module: Những cái mình viết
    UserModule,
    AuthModule,
    HireJobModule,
    JobModule,
    CommentModule,
    JobTypeModule,
    JobTypeDetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
