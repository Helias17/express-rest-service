import { HttpStatus, HttpException } from '@nestjs/common';
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
  async create(@Param('boardId') boardId: string, @Body() createTaskDto: CreateTaskDto): Promise<ITask> {
    return await this.tasksService.create(boardId, createTaskDto);
  }

  @Get()
  async getAll(@Param('boardId') boardId: string): Promise<ITask[] | null> {
    return await this.tasksService.getAll(boardId);
  }

  @Get(':taskId')
  async getOne(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
  ): Promise<ITask | null> {
    return await this.tasksService.getById(boardId, taskId);
  }

  @Delete(':taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
  ): Promise<String> {
    const isTaskDeleted = await this.tasksService.remove(boardId, taskId);
    if (isTaskDeleted) {
      return 'OK';
    } else {
      throw new HttpException('Task was not found', HttpStatus.NOT_FOUND);
    }
  }


  @Put(':taskId')
  async update(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() updateUserDto: UpdateTaskDto,
  ): Promise<ITask | null> {
    return await this.tasksService.update(boardId, taskId, updateUserDto);
  }

}
