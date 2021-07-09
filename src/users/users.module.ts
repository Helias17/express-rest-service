import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import UserEntity from '../entity/User';
import { TasksService } from '../tasks/tasks.service';
import TasksModule from '../tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TasksModule
  ],
  providers: [UsersService, TasksService],
  controllers: [UsersController],
})
export class UsersModule { }
