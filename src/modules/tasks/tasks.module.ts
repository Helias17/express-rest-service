import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import TaskEntity from '../../entity/Task';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
  ],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TypeOrmModule]
})
export default class TasksModule { }
