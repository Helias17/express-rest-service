import { Request, Response } from 'express';

const router = require('express').Router();
const tasksService = require('./task.service');

router.route('/:id/tasks').post(async (req: Request, res: Response) => {

  const createdTask = await tasksService.createTask(req.params['id'], req.body);
  if (createdTask) {
    res.status(201).json(createdTask);
  } else {
    res.status(404).send('Bad request');
  }
});

router.route('/:id/tasks').get(async (req: Request, res: Response) => {
  const tasks = await tasksService.getTasksByBoardId(req.params['id']);
  if (tasks.length) {
    res.status(200).json(tasks);
  } else {
    res.status(404).send('Tasks not found');
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req: Request, res: Response) => {
  const task = await tasksService.getTaskByBoardIdTaskId(req.params['boardId'], req.params['taskId']);

  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).send('Task not found');
  }
});


router.route('/:boardId/tasks/:taskId').put(async (req: Request, res: Response) => {
  const task = await tasksService.updateTask(req.params['boardId'], req.params['taskId'], req.body);

  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req: Request, res: Response) => {
  const isTaskDeleted = await tasksService.deleteTask(req.params['boardId'], req.params['taskId']);
  if (isTaskDeleted) {
    res.status(200).send('OK');
  } else {
    res.status(404).send('Task was not deleted');
  }
});


export { router as taskRouter };
