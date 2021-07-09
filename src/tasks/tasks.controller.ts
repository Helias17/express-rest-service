import { HttpStatus } from '@nestjs/common';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { ITask } from './../interfaces/ITask';


@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED) // response status code
  create(@Param('boardId') boardId: string, @Body() createTaskDto: CreateTaskDto): Promise<ITask> {
    return this.tasksService.create(boardId, createTaskDto);
  }

  @Get()
  getAll(@Param('boardId') boardId: string): Promise<ITask[] | null> {
    return this.tasksService.getAll(boardId);
  }

  @Get(':taskId')
  getOne(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
  ): Promise<ITask | null> {
    return this.tasksService.getById(boardId, taskId);
  }

  @Delete(':taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
  ): Promise<Boolean> {
    return this.tasksService.remove(boardId, taskId);
  }


  @Put(':taskId')
  update(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() updateUserDto: UpdateTaskDto,
  ): Promise<ITask | null> {
    return this.tasksService.update(boardId, taskId, updateUserDto);
  }

}
