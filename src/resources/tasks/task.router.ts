import { Request, Response, Router, NextFunction } from 'express';
import * as tasksService from './task.service';
import { ErrorHandler } from '../../services/errors/ErrorHandler';

const router = Router();

router.route('/:id/tasks').post(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params['id']) {
    const err = new ErrorHandler(404, 'Wrong ID');
    next(err);
  }

  const createdTask = await tasksService.createTask(req.params['id']!, req.body);

  if (createdTask) {
    res.status(201).json(createdTask);
  } else {
    const err = new ErrorHandler(404, 'Bad request');
    next(err);
  }
});

router.route('/:id/tasks').get(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params['id']) {
    const err = new ErrorHandler(404, 'Wrong ID');
    next(err);
  }

  const tasks = await tasksService.getTasksByBoardId(req.params['id']!);
  if (tasks && tasks.length) {
    res.status(200).json(tasks);
  } else {
    const err = new ErrorHandler(404, 'Tasks not found');
    next(err);
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params['boardId'] || !req.params['taskId']) {
    const err = new ErrorHandler(404, 'Wrong boardId or taskId');
    next(err);
  }

  const task = await tasksService.getTaskByBoardIdTaskId(req.params['boardId']!, req.params['taskId']!);

  if (task) {
    res.status(200).json(task);
  } else {
    const err = new ErrorHandler(404, 'Task not found');
    next(err);
  }
});


router.route('/:boardId/tasks/:taskId').put(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params['boardId'] || !req.params['taskId']) {
    const err = new ErrorHandler(404, 'Wrong boardId or taskId');
    next(err);
  }

  const task = await tasksService.updateTask(req.params['boardId']!, req.params['taskId']!, req.body);

  if (task) {
    res.status(200).json(task);
  } else {
    const err = new ErrorHandler(404, 'Task not found');
    next(err);
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params['boardId'] || !req.params['taskId']) {
    const err = new ErrorHandler(404, 'Wrong boardId or taskId');
    next(err);
  }
  const isTaskDeleted = await tasksService.deleteTask(req.params['boardId']!, req.params['taskId']!);
  if (isTaskDeleted) {
    res.status(200).send('OK');
  } else {
    res.status(404).send('Task was not deleted');
    const err = new ErrorHandler(404, 'Task was not deleted');
    next(err);
  }
});


export { router as taskRouter };
