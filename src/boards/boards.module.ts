import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import BoardsController from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardEntity } from '../entity/Board';
import TasksModule from '../tasks/tasks.module';
import { TasksService } from './../tasks/tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardEntity]),
    TasksModule
  ],
  providers: [BoardsService, TasksService],
  controllers: [BoardsController],
})
export class BoardsModule { }
