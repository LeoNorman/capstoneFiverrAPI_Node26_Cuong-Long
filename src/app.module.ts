import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/Auth/auth.module';
import { Comment } from './modules/Comments/comment.entity';
import { HireJob } from './modules/HireJob/hireJob.entity';
import { Job } from './modules/Jobs/job.entity';
import { JobTypeDetail } from './modules/JobTypeDetails/jobTypeDetail.entity';
import { JobType } from './modules/JobTypes/jobType.entity';
import { User } from './modules/Users/user.entity';
import { UserModule } from './modules/Users/user.module';

// Khai báo DB connection
const AppDataSource = TypeOrmModule.forRootAsync({
  useFactory: (config: ConfigService) => ({
    type: 'mysql',
    host: config.get("MYSQL_HOST"),
    port: config.get("MYSQL_PORT"),
    username: config.get("MYSQL_USER"),
    password: config.get("MYSQL_PASSWORD"),
    database: config.get("MYSQL_DATABASE"),
    synchronize: true,
    entities: [User, Job, HireJob, Comment, JobTypeDetail, JobType],
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
