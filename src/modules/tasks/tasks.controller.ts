import {
  HttpStatus,
  HttpException,
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { ITask } from './../../interfaces/ITask';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('boards/:boardId/tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  async create(@Param('boardId') boardId: string, @Body() createTaskDto: CreateTaskDto): Promise<ITask> {
    return await this.tasksService.create(boardId, createTaskDto);
  }

  @Get()
  async getAll(@Param('boardId') boardId: string): Promise<ITask[] | null> {
    const foundTasks = await this.tasksService.getAll(boardId);
    return foundTasks;
  }

  @Get(':taskId')
  async getOne(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
  ): Promise<ITask | null> {
    const foundTask = await this.tasksService.getById(boardId, taskId);
    if (foundTask) {
      return foundTask;
    } else {
      throw new HttpException('Task was not found', HttpStatus.NOT_FOUND);
    }

  }

  @Delete(':taskId')
  async remove(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
  ): Promise<String> {
    if (!boardId || !taskId) {
      throw new HttpException('Wrong boardId or taskId', HttpStatus.NOT_FOUND);
    }
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
