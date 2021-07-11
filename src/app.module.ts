import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { BoardsModule } from './modules/boards/boards.module';
import TasksModule from './modules/tasks/tasks.module';
import LoginModule from './modules/login/login.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    BoardsModule,
    TasksModule,
    LoginModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
