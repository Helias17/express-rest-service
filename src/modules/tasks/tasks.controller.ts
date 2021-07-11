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
  HttpCode,
  UseGuards,
  UseFilters
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { ITask } from './../../interfaces/ITask';
import { AuthGuard } from '../../guards/auth.guard';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';


@Controller('boards/:boardId/tasks')
@UseFilters(new HttpExceptionFilter())
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED) // response status code
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
  @HttpCode(HttpStatus.NO_CONTENT)
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
