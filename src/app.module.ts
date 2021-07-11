import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { BoardsModule } from './modules/boards/boards.module';
import TasksModule from './modules/tasks/tasks.module';
import LoginModule from './modules/login/login.module';
import { winstonOptions } from './common/winston.config';
import { LoggerMiddleware } from './middleware/logRequestsNest';
import { UsersController } from './modules/users/users.controller';
import BoardsController from './modules/boards/boards.controller';
import { LoginController } from './modules/login/login.controller';
import { TasksController } from './modules/tasks/tasks.controller';
import { HttpExceptionFilter } from './filters/http-exception.filter';


@Module({
  imports: [
    WinstonModule.forRoot(winstonOptions),
    TypeOrmModule.forRoot(),
    UsersModule,
    BoardsModule,
    TasksModule,
    LoginModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(LoginController, UsersController, TasksController, BoardsController);
  }
}
