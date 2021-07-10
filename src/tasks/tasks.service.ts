import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import TaskEntity from '../entity/Task';
import { ITask } from '../interfaces/ITask';


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) { }


  async create(boardId: string, taskDto: CreateTaskDto): Promise<ITask> {
    const newTask = new TaskEntity();

    newTask.title = taskDto.title;
    newTask.order = taskDto.order;
    newTask.description = taskDto.description;
    newTask.userId = taskDto.userId!;
    newTask.boardId = boardId!;
    newTask.columnId = taskDto.columnId!;

    await this.tasksRepository.save(newTask);
    return newTask;
  }

  async getAll(boardId: string): Promise<ITask[] | null> {
    const tasksAll = await this.tasksRepository.find({ boardId });
    return tasksAll.length ? tasksAll : null;
  }

  async getById(boardId: string, taskId: string): Promise<ITask | null> {
    const foundTask = await this.tasksRepository.findOne({ 'boardId': boardId, id: taskId });
    return foundTask ? foundTask : null;
  }

  async remove(boardId: string, taskId: string): Promise<Boolean> {
    const foundTask = await this.tasksRepository.findOne({ 'boardId': boardId, id: taskId });
    if (foundTask) {
      await this.tasksRepository.remove(foundTask);
      return true;
    }
    return false;
  }

  async update(boardId: string, taskId: string, taskDto: UpdateTaskDto): Promise<ITask | null> {
    const foundTask = await this.tasksRepository.findOne({ 'boardId': boardId, id: taskId });

    if (foundTask) {
      foundTask.title = taskDto.title;
      foundTask.order = taskDto.order;
      foundTask.description = taskDto.description;
      foundTask.userId = taskDto.userId!;
      foundTask.boardId = taskDto.boardId!;
      foundTask.columnId = taskDto.columnId!;

      await this.tasksRepository.save(foundTask);

      return foundTask;
    }
    return null;
  }

  async updateTasksAfterUserDeleted(userId: string): Promise<Boolean> {
    const foundTasks = await this.tasksRepository.find({ 'userId': userId });

    if (foundTasks.length) {
      const taskPromisesArr = foundTasks.map(async (task) => {
        task.userId = null!;
        return await this.tasksRepository.save(task);
      })
      await Promise.all(taskPromisesArr);
      return true;
    }

    return false;

  }

  async deleteTasksByBoardId(boardId: string) {
    let isTasksDeleted = false;

    const foundTasks = await this.tasksRepository.find({ 'boardId': boardId });

    if (foundTasks.length) {
      const taskPromisesArr = foundTasks.map(async (task) => {
        return this.tasksRepository.remove(task);
      })
      await Promise.all(taskPromisesArr);
      isTasksDeleted = true;
    }
    return isTasksDeleted;
  }


}
